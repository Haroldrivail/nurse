export type SearchItem = {
  title: string;
  excerpt: string;
  href: string;
  tags?: string[];
};

export const searchIndex: SearchItem[] = [
  {
    title: "Mission",
    excerpt:
      "Des soins accessibles, humains et durables via cliniques mobiles, formation et prévention.",
    href: "/mission",
    tags: ["soins", "cliniques", "prévention"],
  },
  {
    title: "À propos",
    excerpt: "Gouvernance, transparence et engagement humain de la fondation.",
    href: "/about",
    tags: ["gouvernance", "transparence"],
  },
  {
    title: "Causes & Projets",
    excerpt:
      "Programmes ancrés dans les besoins locaux : santé rurale, maternité, urgences.",
    href: "/projects",
    tags: ["projets", "santé rurale", "maternité", "urgence"],
  },
  {
    title: "Impact",
    excerpt: "Indicateurs, pays d’intervention et rapports d’impact détaillés.",
    href: "/impact",
    tags: ["indicateurs", "rapports", "pays"],
  },
  {
    title: "S’impliquer",
    excerpt:
      "Bénévolat, partenariats et collectes solidaires pour soutenir la mission.",
    href: "/s-impliquer",
    tags: ["bénévolat", "partenariats", "collectes"],
  },
  {
    title: "Faire un don",
    excerpt:
      "Un impact durable, ponctuel ou mensuel. Choisissez votre niveau d’engagement.",
    href: "/dons",
    tags: ["don", "mensuel", "impact"],
  },
  {
    title: "Actualités",
    excerpt: "Articles terrain, urgences humanitaires et rapports annuels.",
    href: "/blog",
    tags: ["blog", "actualités", "rapports"],
  },
  {
    title: "Mentions légales",
    excerpt:
      "Informations légales, confidentialité et conditions d’utilisation.",
    href: "/legal",
    tags: ["légal", "confidentialité"],
  },
];
