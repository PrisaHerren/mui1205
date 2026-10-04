import { Stack, Typography } from '@mui/material'
import Panel from '../components/Panel'
import SectionTitle from '../components/SectionTitle'
import TagChip from '../components/TagChip'
import { getTags } from '../lib/posts'

export default function TagsPage() {
  const tags = getTags()
  return (
    <Panel>
      <SectionTitle>標籤</SectionTitle>
      {tags.length === 0 ? (
        <Typography color="text.secondary">還沒有任何標籤。</Typography>
      ) : (
        <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
          {tags.map(({ tag, count }) => (
            <TagChip key={tag} tag={tag} count={count} />
          ))}
        </Stack>
      )}
    </Panel>
  )
}
