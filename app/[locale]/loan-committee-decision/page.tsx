import { Header } from "@/components/header"
import { LoanCommitteeDecisionForm } from "@/components/loan-committee-decision-form"
import { Footer } from "@/components/footer"

export default function LoanCommitteeDecisionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LoanCommitteeDecisionForm />
      </main>
      <Footer />
    </div>
  )
}

