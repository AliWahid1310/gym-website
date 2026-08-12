export interface Testimonial {
  id: string;
  name: string;
  image: string;
  memberSince: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Hassan Malik",
    image: "/images/member-hassan.jpg",
    memberSince: "Member since 2021",
    rating: 5,
    quote:
      "I've trained at six gyms in this city. 360 Fitness is the first one where I actually look forward to showing up every single day. The trainers don't just count your reps — they genuinely invest in your progress.",
  },
  {
    id: "t2",
    name: "Ayesha Tariq",
    image: "/images/member-ayesha.jpg",
    memberSince: "Member since 2022",
    rating: 5,
    quote:
      "As a woman, I was nervous about joining a serious gym. The team here made me feel welcome from day one. I've lost 18kg and gained confidence I didn't know I had. This place changes lives.",
  },
  {
    id: "t3",
    name: "Faisal Ahmed",
    image: "/images/member-faisal.jpg",
    memberSince: "Member since 2020",
    rating: 5,
    quote:
      "The equipment is world-class, the facility is spotless, and the coaching is on another level. I drove 40 minutes each way and it's still worth every minute. Nothing else compares.",
  },
  {
    id: "t4",
    name: "Mehreen Shah",
    image: "/images/member-mehreen.jpg",
    memberSince: "Member since 2023",
    rating: 5,
    quote:
      "The group classes here are addictive. Sara's HIIT sessions are brutal in the best way, and the boxing classes with Bilal are the highlight of my week. Best investment in myself.",
  },
  {
    id: "t5",
    name: "Usman Ghani",
    image: "/images/member-usman.jpg",
    memberSince: "Member since 2019",
    rating: 5,
    quote:
      "I've been training here since they opened. What sets 360 Fitness apart is the community — everyone pushes each other. The owner knows every member by name. You won't find that anywhere else.",
  },
  {
    id: "t6",
    name: "Rana Imran",
    image: "/images/member-rana.jpg",
    memberSince: "Member since 2024",
    rating: 5,
    quote:
      "I was skeptical at first but decided to try the free trial class. That one class changed everything. Four months in, I've dropped 12kg and hit a personal best on deadlifts. The programming here is seriously next level.",
  },
];

export const aggregateRating = {
  score: 4.9,
  totalReviews: 248,
  platform: "Google Reviews",
};
