import { format, isPast } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'
import { CheckCircle, Lock } from 'phosphor-react'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson({ availableAt, slug, title, type }: LessonProps) {
  const isLessonAvailable = isPast(availableAt)

  const availableDateFormat = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'K'h'MM",
    {
      locale: ptBR,
    },
  )

  return (
    <Link href={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormat}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} weight="bold" />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} weight="bold" />
              Em breve
            </span>
          )}

          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold">
            {type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">{title}</strong>
      </div>
    </Link>
  )
}
