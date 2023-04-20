import { Logo } from '@/components/Logo'
import { useCreateSubscriberMutation } from '@/graphql/generated'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const router = useRouter()

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscriber(event: FormEvent) {
    event?.preventDefault()

    createSubscriber({
      variables: {
        name,
        email,
      },
    })

    await router.push('/event')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <div className="absolute inset-0">
        <Image src="/blur.png" alt="background image" fill quality={100} />
      </div>

      <div className="relative w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{' '}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscriber}
            className="flex flex-col gap-2 w-full"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nome completo"
              className="
            bg-gray-900 rounded h-14 px-5 "
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Digite seu email"
              className="
            bg-gray-900 rounded h-14 px-5 "
            />

            <button
              type="submit"
              disabled={loading || router.isFallback}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <Image
        src="/code.png"
        alt=""
        className="mt-4 relative"
        width={1150}
        height={600}
        quality={100}
      />
    </div>
  )
}
