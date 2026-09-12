type FeatureCardProps = Readonly<{
  title: string;
  description: string;
}>;

export default function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      <p className="card__text">{description}</p>
    </article>
  );
}
