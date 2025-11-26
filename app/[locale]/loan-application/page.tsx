import { Header } from "@/components/header"
import { LoanApplicationForm } from "@/components/loan-application-form"
import { Footer } from "@/components/footer"

export default function LoanApplicationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LoanApplicationForm />
      </main>
      <Footer />
    </div>
  )
}

