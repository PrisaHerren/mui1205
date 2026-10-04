import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import TagsPage from './pages/TagsPage'
import TagPage from './pages/TagPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:slug" element={<PostPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
