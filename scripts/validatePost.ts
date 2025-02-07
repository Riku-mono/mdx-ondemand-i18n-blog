import fs from 'fs';
import matter from 'gray-matter';
import { execSync } from 'child_process';

type FrontMatter = {
  published: boolean;
  icon?: string;
  title: string;
  description?: string;
  date: string;
  lastupdated?: string;
  categories: string[];
  tags?: string[];
};

const ALLOWED_KEYS: (keyof FrontMatter)[] = [
  'published',
  'icon',
  'title',
  'description',
  'date',
  'lastupdated',
  'categories',
  'tags',
];

const REQUIRED_KEYS: (keyof FrontMatter)[] = [
  'published',
  'title',
  'description',
  'date',
  'categories',
];

// `YYYY-MM-DDTHH:mm:ss+09:00`
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}$/;

function validatePost(postPath: string): string[] {
  const post = fs.readFileSync(postPath, 'utf-8');
  const { data: frontmatter } = matter(post);

  const errors: string[] = [];

  // Check if filePath is mutch url pattern
  const fileName = postPath.split('/').pop();
  const slug = fileName?.replace('.mdx', '');
  if (slug?.includes(' ')) {
    errors.push('❌ filePath is not match url pattern');
  }

  // Check if all required keys are present
  REQUIRED_KEYS.forEach((key) => {
    if (!frontmatter[key]) {
      errors.push(`❌ Missing required key: ${key}`);
    }
  });

  // Check for unknown keys
  Object.keys(frontmatter).forEach((key) => {
    if (!ALLOWED_KEYS.includes(key as keyof FrontMatter)) {
      errors.push(`⚠️ Unknown key detected: ${key}`);
    }
  });

  // Check published value
  if (typeof frontmatter.published !== 'boolean') {
    errors.push('❌ published must be a boolean');
  }

  // Check date and lastupdated format
  if (!ISO_DATE_REGEX.test(frontmatter.date)) {
    errors.push('❌ date must be in ISO format: YYYY-MM-DDTHH:mm:ss+09:00');
  }
  if (frontmatter.lastupdated && !ISO_DATE_REGEX.test(frontmatter.lastupdated)) {
    errors.push('❌ lastupdated must be in ISO format: YYYY-MM-DDTHH:mm:ss+09:00');
  }

  // Check lastupdated is same or after date
  if (frontmatter.lastupdated && frontmatter.date > frontmatter.lastupdated) {
    errors.push('❌ lastupdated must be same or after date');
  }

  return errors;
}

function getStagedMdxFiles(): string[] {
  try {
    const output = execSync('git diff --name-only --cached', { encoding: 'utf-8' });
    return output
      .split('\n')
      .filter((file) => file.startsWith('src/contents/posts/') && file.endsWith('.mdx'));
  } catch (error) {
    console.error('❌ Failed to get staged files:', error);
    return [];
  }
}

function main() {
  const stagedMdxFiles = getStagedMdxFiles();
  let hasErrors = false;

  stagedMdxFiles.forEach((file) => {
    console.log(`🔍 Validating ${file}...`);
    const errors = validatePost(file);

    if (errors.length > 0) {
      hasErrors = true;
      console.log(`❌ ${file} has errors:`);
      errors.forEach((error) => console.log(error));
    }
  });

  if (hasErrors) {
    console.log('❌ Validation failed. Please fix the errors before committing.');
    process.exit(1);
  } else {
    console.log('✅ Validation passed.');
  }
}

main();
