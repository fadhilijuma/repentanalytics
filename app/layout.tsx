import './globals.css'

export const metadata = {
  title: 'repent',
  description: 'Gate 1 Recordings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
