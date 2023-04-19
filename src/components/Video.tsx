import { gql, useQuery } from '@apollo/client'
import '@vime/core/themes/default.css'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
  Image as ImageIcon,
} from 'phosphor-react'

const VideoPlayer = dynamic(() => import('../components/VideoPlayer'), {
  ssr: false,
})

interface VideoProps {
  lessonSlug: string
}

const GET_LESSON_BY_SLUG = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      description
      videoId
      teacher {
        bio
        name
        avatarURL
      }
    }
  }
`

interface GetLessonBySlugProps {
  lesson: {
    title: string
    videoId: string
    description: string
    teacher: {
      bio: string
      avatarURL: string
      name: string
    }
  }
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useQuery<GetLessonBySlugProps>(GET_LESSON_BY_SLUG, {
    variables: {
      slug: lessonSlug,
    },
  })

  if (!data) {
    return <div className="flex-1">Carregando ...</div>
  }

  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <VideoPlayer videoId={data.lesson.videoId} />
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{data.lesson.title}</h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <Image
                width={128}
                height={128}
                src="https://github.com/manoguii.png"
                alt="Avatar image"
                className="h-16 w-16 rounded-full border-2 border-blue-500"
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href=""
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </Link>
            <Link
              href=""
              className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <Lightning size={24} />
              Acesse o desafio
            </Link>
          </div>
        </div>

        <div className="gap-8 mt-20 grid grid-cols-2">
          <Link
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu
                desenvolvimento
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </Link>

          <Link
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <ImageIcon size={40} />
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua
                máquina
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
