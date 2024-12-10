import Image from "next/image"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden items-center justify-center lg:flex w-1/2 xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image src="/assets/icons/logo-full.svg" alt="logo" width={224} height={82} className="h-auto" />
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best wayyyy  yyy</h1>
            <p className="body-1">This is a place where you can store all your documents.</p>
          </div>
          <Image src="/assets/images/files.png" width={342} height={342} alt="Files"
            className="transition-all hover:rotate-2 hover:scale-105" />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center p-4 py-10 bg-white lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-60 lg:hidden" >
          <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={224} height={82}
            className="h-auto w-[200px] lg:w-[250px] " />
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout
