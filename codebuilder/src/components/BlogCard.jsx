import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ title, excerpt, date, category, slug }) {
  return (
    <div className="bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all group">
      <div className="h-52 bg-gradient-to-br from-zinc-800 to-black relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-4 left-4 bg-primary text-black text-xs font-bold px-4 py-1 rounded-full">
          {category}
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1"><Calendar size={16} /> {date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition">{title}</h3>
        <p className="text-gray-400 line-clamp-3 mb-6">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="text-primary hover:underline flex items-center gap-2">
          Read More →
        </Link>
      </div>
    </div>
  );
}