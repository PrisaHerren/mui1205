import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Box, Link, Typography } from '@mui/material'
import 'highlight.js/styles/github.css'
import { resolveImage } from '../lib/posts'

export default function MarkdownView({ source }: { source: string }) {
  return (
    <Box
      sx={{
        mt: 2,
        '& pre': { p: 2, bgcolor: '#f6f8fa', borderRadius: 1, overflowX: 'auto' },
        '& code': { fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '0.9em' },
        '& :not(pre) > code': { bgcolor: '#f0f2f5', px: 0.6, py: 0.2, borderRadius: 0.5 },
        '& img': { maxWidth: '100%', borderRadius: '4px' },
        '& blockquote': {
          m: 0,
          my: 2,
          pl: 2,
          borderLeft: 4,
          borderColor: 'primary.main',
          color: 'text.secondary',
        },
        '& table': { borderCollapse: 'collapse', my: 2 },
        '& th, & td': { border: 1, borderColor: 'divider', p: 1 },
        '& li': { lineHeight: 1.9 },
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 2 }}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h3" sx={{ mt: 3, mb: 1.5 }}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" component="h4" sx={{ mt: 2, mb: 1 }}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" sx={{ my: 1.5, lineHeight: 1.9 }}>
              {children}
            </Typography>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </Link>
          ),
          img: ({ src, alt }) => (
            <img src={resolveImage(src)} alt={alt ?? ''} loading="lazy" />
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </Box>
  )
}
