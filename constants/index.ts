export const toggleTheme = [
  { icon: "/assets/icons/sun.svg", value: "light", title: "Light" },
  { icon: "/assets/icons/moon.svg", value: "dark", title: "Dark" },
  { icon: "/assets/icons/computer.svg", value: "system", title: "System" },
];

export const mobileNavs = [
  { title: "Home", route: "/", imgUrl: "/assets/icons/home.svg" },
  {
    title: "Community",
    route: "/community",
    imgUrl: "/assets/icons/users.svg",
  },
  {
    title: "Collection",
    route: "/collection",
    imgUrl: "/assets/icons/star.svg",
  },
  {
    title: "Find Jobs",
    route: "/find-jobs",
    imgUrl: "/assets/icons/suitcase.svg",
  },
  { title: "Tags", route: "/tags", imgUrl: "/assets/icons/tag.svg" },
  {
    title: "Ask a question",
    route: "/ask-question",
    imgUrl: "/assets/icons/question.svg",
  },
];

export const topQuestions = [
  { _id: "1", title: "How to center a div?" },
  { _id: "2", title: "How to learn frontend in 1 month" },
  { _id: "3", title: "what is next.js ssr and csr?" },
  {
    _id: "4",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  { _id: "5", title: "Is it only me or the font is bolder than necessary?" },
  { _id: "6", title: "Redux Toolkit Not Updating State as Expected" },
];

export const topTags = [
  { _id: "1", name: "React", numberofQuestion: 3 },
  { _id: "2", name: "Next.js", numberofQuestion: 33 },
  { _id: "3", name: "JavaScript", numberofQuestion: 32 },
  { _id: "4", name: "Redux", numberofQuestion: 31 },
  { _id: "5", name: "SSR", numberofQuestion: 35 },
  { _id: "6", name: "Tailwind CSS", numberofQuestion: 23 },
];

export const cardQuestions = [
  {
    _id: "1",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: [{ _id: "1", name: "Next.js" }],
    author: {
      _id: "1",
      name: "Nitish",
      picture: "/assets/images/site-logo.svg",
      clerkId: "1243",
    },
    upvotes: 2,
    views: 10,
    answers: 1,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "Can I get the course for free?",
    tags: [{ _id: "1", name: "Next.js" }],
    author: {
      _id: "1",
      name: "Nitish",
      picture: "/assets/images/site-logo.svg",
      clerkId: "1243",
    },
    upvotes: 2,
    views: 10,
    answers: 1,
    createdAt: new Date(),
  },
];

export const usersCard = [
  {
    _id: "1",
    clerkId: "12123",
    name: "Nitish",
    username: "nitish95",
    picture: "/assets/images/nitish.jpg",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React.js" },
    ],
  },
  {
    _id: "2",
    clerkId: "12123",
    name: "Kapil",
    username: "kapil98",
    picture: "/assets/images/nitish.jpg",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React.js" },
    ],
  },
  {
    _id: "3",
    clerkId: "12123",
    name: "Rahul",
    username: "rahul",
    picture: "/assets/images/nitish.jpg",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React.js" },
    ],
  },
  {
    _id: "4",
    clerkId: "12123",
    name: "suraj",
    username: "suraj",
    picture: "/assets/images/nitish.jpg",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React.js" },
    ],
  },
];
