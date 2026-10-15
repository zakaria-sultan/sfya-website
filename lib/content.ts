export const nav = [
  ["About", "/about"], ["Programmes", "/programmes"], ["Experience", "/experience"],
  ["Leadership", "/leadership"], ["Partners", "/partners"], ["Contact", "/contact"]
] as const;

export const values = ["Youth Voice", "Inclusion", "Safeguarding", "Integrity", "Innovation", "Partnership"];

export const pillars = [
  {
    id:"01", title:"Adolescent Development, Youth Leadership & Civic Participation", tone:"teal",
    items:["Life skills", "Mentoring", "School & community clubs", "Leadership", "Civic education", "Participation in decisions"]
  },
  {
    id:"02", title:"Adolescent Girls’ & Women’s Empowerment", tone:"gold",
    items:["Girls’ education & retention", "Leadership", "Rights awareness", "Gender equality", "Digital literacy", "Economic opportunities"]
  },
  {
    id:"03", title:"Skills, Enterprise & Socioeconomic Opportunity", tone:"navy",
    items:["Educational transitions", "Career guidance", "Vocational skills", "Apprenticeships", "Employability", "Entrepreneurship"]
  },
  {
    id:"04", title:"Community Development & Resilience", tone:"cyan",
    items:["Youth-led initiatives", "Health & wellbeing", "WASH", "Environmental action", "Peacebuilding", "Service referrals"]
  }
];

export const experience = [
  {title:"Community Participation", text:"Mobilising adolescents, youth and women to take part in community dialogues, local planning and youth-led initiatives, working with community leaders, schools and local structures."},
  {title:"Risk Communication & Community Engagement", text:"Rooted in our COVID-19 response: awareness campaigns, tackling misinformation and youth-friendly messaging through peer networks and digital platforms."},
  {title:"Training & Skills Development", text:"Life skills, leadership, digital and vocational training delivered in collaboration with local and international training institutions."}
];

export const contact = {
  address:"Orfane Tower 105, Taleex, Hodan, Mogadishu, Somalia",
  phone:"+252615021204",
  email:"info@sharedyouth.com",
  website:"sharedyouth.com"
};

export const whatsappUrl = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;
