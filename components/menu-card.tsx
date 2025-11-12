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
        "group rounded-xl border border-border/50 bg-card/60 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-brand/20",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border/50 transition-transform duration-300 group-hover:scale-110">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium transition-colors group-hover:text-brand">{title}</h3>
          {caption ? (
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{caption}</p>
          ) : null}
          <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-brand/10 px-2 py-1 text-xs font-medium text-brand transition-colors group-hover:bg-brand/20">
            ${price}
          </div>
        </div>
      </div>
    </article>
  )
}
