export default function Note() {
  const todaysDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="py-4 px-2">
      <div className="flex justify-between">
        <p className="text-muted-foreground">
          Breadcrumbs (make this later)
        </p>
        <p className="text-muted-foreground">
          {todaysDate}
        </p>
      </div>
      <section className="flex flex-col py-4 gap-4">
        <h1 className="font-semibold text-3xl">
          Note title
        </h1>
        <h3 className="text-xl backdrop-opacity-95">
          Note loose description
        </h3>
      </section>
    </div>
  )
}