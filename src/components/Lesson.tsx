/* eslint-disable prettier/prettier */
import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CheckCircle, Lock } from 'phosphor-react'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson({ availableAt, slug, title, type }: LessonProps) {
  const router = useRouter()

  const isLessonAvailable = isPast(availableAt)

  const availableDateFormat = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'K'h'MM",
    {
      locale: ptBR,
    },
  )

  const isActiveLesson = slug === router.query.slug

  return (
    <Link href={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormat}</span>

      <div
        // eslint-disable-next-line prettier/prettier
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${isActiveLesson && 'bg-green-500'
          }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={`text-sm font-medium flex items-center gap-2 ${isActiveLesson ? 'text-white' : 'text-blue-500'}`}>
              <CheckCircle size={20} weight="bold" />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} weight="bold" />
              Em breve
            </span>
          )}

          <span className={`text-xs rounded py-[0.125rem] px-2 text-white border  font-bold ${isActiveLesson ? 'border-white' : 'border-green-300'}`}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
          </span>
        </header>

        <strong className={`mt-5 block ${isActiveLesson ? 'text-white' : 'text-gray-200'}`}>{title}</strong>
      </div>
    </Link>
  )
}
