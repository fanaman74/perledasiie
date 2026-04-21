type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
};

type FeaturedDishesProps = {
  dict: { title: string };
  dishes: Dish[];
};

export default function FeaturedDishes({ dict, dishes }: FeaturedDishesProps) {
  return (
    <section id="featured" className="py-24 px-6 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-display italic text-3xl md:text-4xl text-center mb-12">
          {dict.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dishes.map((item) => (
            <div
              key={item.id}
              className="relative rounded-lg overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image || ''}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-display text-xl italic mb-1 drop-shadow-lg">{item.name}</h3>
                <p className="text-white/80 text-sm mb-2 drop-shadow-md">{item.description}</p>
                <span className="text-accent font-display text-lg drop-shadow-md">{item.price.toFixed(2)}&euro;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
