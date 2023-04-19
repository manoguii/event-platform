import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Video } from '@/components/Video'
import { useRouter } from 'next/router'

export default function Lesson() {
  const router = useRouter()

  const slug = String(router.query.slug)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-1">
        <Video lessonSlug={slug} />
        <Sidebar />
      </main>
    </div>
  )
}
