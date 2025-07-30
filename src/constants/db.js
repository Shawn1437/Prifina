const dummyData = [
  {
    id: '1',
    question: "How can I improve my startup's product-market fit?",
    desc: "Product-market fit requires continuous iteration based on customer feedback. Start by identifying your core value proposition and validate it with real users. Focus on retention metrics rather than just acquisition - if users aren't coming back, you haven't achieved PMF yet.",
    desc1:
      "The key is to build something people want so badly they tell their friends about it. This means deeply understanding your target customer's pain points and creating a solution that's 10x better than existing alternatives.",
    desc2:
      'TStart with a small, focused market segment where you can dominate, then expand. Measure leading indicators like user engagement, retention rates, and organic growth rather than just vanity metrics.',

    pinned: true,
    time: '2m ago',
    reactions: { brain: 3, thumb: 2 },
  },
  {
    id: '2',
    question: 'What are the key metrics for SaaS businesses?',
    desc: 'The most critical SaaS metrics include Monthly Recurring Revenue (MRR), Customer Acquisition Cost (CAC), Lifetime Value (LTV), churn rate, and Net Promoter Score (NPS). The CAC:LTV ratio should ideally be 1:3 or better.',
    desc1:
      'MRR is your north star - it shows predictable revenue growth. Track both new MRR from acquisitions and expansion MRR from existing customers upgrading. Churn rate should be under 5% monthly for healthy SaaS businesses.',
    desc2:
      'Other important metrics include: Time to Value (how quickly users see benefit), Product Qualified Leads (PQLs), and Annual Contract Value (ACV). Focus on cohort analysis to understand how different customer segments behave over time.',
    reactions: { brain: 6, thumb: 4 },
    pinned: true,
    time: '12m ago',
  },
  {
    id: '3',
    question: 'How do I pitch to investor effectively?',
    desc: 'A compelling investor pitch tells a story: problem, solution, market opportunity, traction, business model, competition, team, financials, and funding ask. Keep it concise - 10-12 slides maximum.',
    desc1:
      'Start with the problem - make it personal and relatable. Show the market size but focus on your addressable market. Demonstrate traction with real metrics, not projections. Investors invest in teams, so highlight your unique advantages and domain expertise.',
    desc2:
      "Practice your pitch until it's conversational, not scripted. Anticipate questions about unit economics, competitive differentiation, and scaling challenges. End with a clear ask - how much you're raising and what you'll use it for.",
    reactions: { brain: 6, thumb: 4 },
    pinned: true,
    time: '12m ago',
  },
];

const sessionsData = [
  {
    id: '1',
    title: 'Startup Fundraising Strategy',
    messages: 6,
    reactions: { brain: 8, thumb: 4 },
    pinned: true,
    time: '12m',
    heading: 'When should I start fundraising',
    desc1:
      'Start fundraising when you have clear traction and a compelling growth story. Ideally, you should begin the process 6-9 months before you actually need the money. This gives you time to build relationships with investors and negotiate from a position of strength.',
    desc2:
      "Key indicators you're ready: consistent month-over-month growth, product-market fit signals, a clear path to scale, and 12-18 months of runway remaining. Don't fundraise too early when you're still figuring out your business model.",
  },
  {
    id: '2',
    title: 'Product Management Fundamentals',
    messages: 4,
    reactions: { brain: 6, lightbulb: 2 },
    pinned: false,
    time: '8m',
    heading: 'How do I prioritize features?',
    desc1:
      'Use frameworks like RICE (Reach, Impact, Confidence, Effort) or Kano model to systematically evaluate features. Consider user value, business impact, technical complexity, and strategic alignment.',
    desc2:
      'Start with features that solve core user problems and drive key metrics. Avoid feature creep by saying no to nice-to-haves. Regularly review and adjust priorities based on user feedback and data.hours',
  },
];

const draftsData = [
  {
    title: 'The Future of AI in Startup Operations',
    metadata: 'Trending topic: AI in business',
    time: '2 hours ago',
    snippet:
      'As AI continues to evolve, startups are finding innovative ways to leverage these technologies to streamline operations and accelerate growth...',
    tags: ['AI', 'Startups', 'Operations'],
    category: 'Thought Leadership',
  },
  {
    title: 'Building Product-Market Fit: Lessons from 100+ Startups',
    metadata: 'New knowledge added',
    time: '1 day ago',
    snippet:
      'After analyzing patterns from successful and failed startups, several key principles emerge for achieving true product-market fit...',
    tags: ['Product Management', 'Startups'],
    category: 'Analytical',
  },
  {
    title: 'The Metrics That Matter for SaaS Growth',
    metadata: 'Pinned interaction insighta',
    time: '3 day ago',
    snippet:
      'While vanity metrics can make you feel good, focusing on the right KPIs is crucial for sustainable SaaS business growth...',
    tags: ['Saas', 'Growth' , 'Metrics'],
    category: 'Analytical',
  },
];

export { dummyData, sessionsData, draftsData };
