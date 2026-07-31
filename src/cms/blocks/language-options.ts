/** Shared language options for CMS code blocks and Lexical CodeBlock feature. */
export const languageOptions = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Bash / Shell', value: 'bash' },
  { label: 'Shell', value: 'shell' },
  { label: 'JSON', value: 'json' },
  { label: 'CSS', value: 'css' },
  { label: 'HTML', value: 'html' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
  { label: 'Plain Text', value: 'plaintext' },
]

export const codeBlockLanguages: Record<string, string> = Object.fromEntries(
  languageOptions.map((opt) => [opt.value, opt.label]),
)

export const defaultCodeLanguage = 'plaintext'
