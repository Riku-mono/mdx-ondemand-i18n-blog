import fs from 'fs';
import matter from 'gray-matter';
import { execSync } from 'child_process';

enum Layout {
  Default = 'default',
  FullWidth = 'full-width',
}

type FrontMatter = {
  published: boolean;
  title: string;
  date: string;
  lastupdated?: string;
  layout: Layout;
};

const ALLOWED_KEYS: (keyof FrontMatter)[] = ['published', 'title', 'date', 'lastupdated', 'layout'];
const REQUIRED_KEYS: (keyof FrontMatter)[] = ['published', 'title', 'date', 'layout'];
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

function validateRequiredKeys(frontmatter: FrontMatter): string[] {
  return REQUIRED_KEYS.filter((key) => !frontmatter[key]).map(
    (key) => `❌ Missing required key: ${key}`
  );
}

function validateUnknownKeys(frontmatter: FrontMatter): string[] {
  return Object.keys(frontmatter)
    .filter((key) => !ALLOWED_KEYS.includes(key as keyof FrontMatter))
    .map((key) => `⚠️ Unknown key detected: ${key}`);
}

function validateLayout(frontmatter: FrontMatter): string[] {
  return !Object.values(Layout).includes(frontmatter.layout) ? ['❌ Invalid layout'] : [];
}

function validateDate(frontmatter: FrontMatter): string[] {
  const errors: string[] = [];
  if (!ISO_DATE_REGEX.test(frontmatter.date)) {
    errors.push('❌ Invalid date format');
  }
  if (frontmatter.lastupdated && !ISO_DATE_REGEX.test(frontmatter.lastupdated)) {
    errors.push('❌ Invalid lastupdated format');
  }
  return errors;
}

function validatePublished(frontmatter: FrontMatter): string[] {
  return typeof frontmatter.published !== 'boolean' ? ['❌ Invalid published value'] : [];
}

function validatePath(filePath: string): string[] {
  const fileName = filePath.split('/').pop();
  const slug = fileName?.replace('.mdx', '');
  return slug?.includes(' ') ? ['❌ Invalid slug'] : [];
}

function validateContent(content: string): string[] {
  return !content.trim() ? ['❌ Empty content'] : [];
}

function validatePage(pagePath: string): string[] {
  const page = fs.readFileSync(pagePath, 'utf-8');
  const { data: frontmatter, content } = matter(page);
  return [
    ...validateRequiredKeys(frontmatter as FrontMatter),
    ...validateUnknownKeys(frontmatter as FrontMatter),
    ...validateLayout(frontmatter as FrontMatter),
    ...validateDate(frontmatter as FrontMatter),
    ...validatePublished(frontmatter as FrontMatter),
    ...validatePath(pagePath),
    ...validateContent(content),
  ];
}

function getStagedMdxFiles(): string[] {
  try {
    return execSync('git diff --cached --name-only', { encoding: 'utf-8' })
      .toString()
      .split('\n')
      .filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error('❌ Failed to get staged files:', error);
    return [];
  }
}

function main() {
  const stagedMdxFiles = getStagedMdxFiles();
  let hasErrors = false;

  const errors: string[] = [];

  stagedMdxFiles.forEach((filePath) => {
    console.log(`🔍 Validating ${filePath}...`);
    const pageErrors = validatePage(filePath);
    if (pageErrors.length > 0) {
      hasErrors = true;
      errors.push(`❌ ${filePath} has errors:`);
      errors.push(...pageErrors);
    }
  });

  if (hasErrors) {
    console.error(errors.join('\n'));
    process.exit(1);
  } else {
    console.log('✅ All pages are validation passed.');
  }
}

main();
