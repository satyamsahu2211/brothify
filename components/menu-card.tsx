import Image from "next/image"
import { cn } from "@/lib/utils"

type MenuCardProps = {
  title: string
  price: number
  image: string
  className?: string
  caption?: string
}

export function MenuCard({ title, price, image, caption, className }: MenuCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 p-4 transition-all duration-500 hover:bg-card hover:shadow-xl hover:border-brand/20",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/50 shadow-sm">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="truncate font-serif text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-brand">
                {title}
              </h3>
              <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-0.5 text-sm font-semibold text-brand">
                ${price}
              </span>
            </div>
            {caption ? (
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/80">
                {caption}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-brand/10 rounded-2xl pointer-events-none" />
    </article>
  )
}
