import { Gem, Laptop, Shirt, ShoppingBag } from "lucide-react";

function ProductArtwork({ category, className = "" }) {
    const normalizedCategory = category?.toLowerCase() ?? "";

    return (
        <div
            aria-hidden="true"
            className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 via-amber-50 to-zinc-100 text-orange-700 ${className}`}
        >
            {normalizedCategory.includes("electronic") ? (
                <Laptop className="size-20 max-h-2/3 max-w-2/3" strokeWidth={1.25} />
            ) : normalizedCategory.includes("jewel") ? (
                <Gem className="size-20 max-h-2/3 max-w-2/3" strokeWidth={1.25} />
            ) : normalizedCategory.includes("clothing") ? (
                <Shirt className="size-20 max-h-2/3 max-w-2/3" strokeWidth={1.25} />
            ) : (
                <ShoppingBag className="size-20 max-h-2/3 max-w-2/3" strokeWidth={1.25} />
            )}
        </div>
    );
}

export default ProductArtwork;
