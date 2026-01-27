export interface Guest {
  id: number
  name: string
  role: string
  image: string
  slug : string
  facebook?: string
  youtube?: string
  x?: string
  website?: string
}

export interface Schedule {
  guests: Guest[]
  startTime: string
  startPeriod: 'Am' | 'Pm'
  endTime: string
  endPeriod: 'Am' | 'Pm'
  title: string
  author: string
  company: string
  description: string
  location: string
}

export interface ScheduleDay {
  title: string
  day: string
  month: string
  year: string
  schedules: Schedule[]
}

const foireGuests :Guest[] = [
  {
    id: 1,
    name: 'Pascal Badre',
    slug: 'pascal-badre',
    role: 'Comic',
    image: '/img/events/autors/pascal_badre.png',
    facebook: 'https://www.facebook.com/profile.php?id=100002835634820',
    x: 'https://x.com/bigbohomme',
    website: 'https://dessin-badre.over-blog.com',
  },
  {
    id: 2,
    name: 'Anne Siegel',
    slug: 'anne-siegel',
    role: 'Atelier',
    image: '/img/events/autors/anne_siegel.jpg',
    facebook: 'https://www.facebook.com/reliuresetcreations/',
    website: 'https://reliures-creations.fr',
  },
  {
    id: 3,
    name: 'Christian Peultier',
    slug: 'christian-peultier',
    role: 'Comic',
    image: '/img/events/autors/christian_peultier.jpg',
    facebook: 'https://www.facebook.com/reliuresetcreations/',
    website: 'https://reliures-creations.fr',
  },
  {
    id: 4,
    name: 'Pascal Graffica',
    slug: 'pascal-graffica',
    role: 'Comic',
    image: '/img/events/autors/pascal_graffica.png',
    facebook: 'https://www.facebook.com/pascal.graffica',
    website: 'https://pascalgraffica.blogspot.com',
  }
]

export const useEventSchedule = () => {
  const selectedDay = ref(0)

  // Du 4 au 13 septembre 2026
  // 10h - 20h (fermeture des stands à 20h)

  const scheduleDays = ref<ScheduleDay[]>([
    {
      day: '4',
      month: 'Sep',
      year: '2026',
      title: 'First',
      schedules: [
        {
          guests: [foireGuests[0], foireGuests[1], foireGuests[2], foireGuests[3]],
          startTime: '10:00',
          startPeriod: 'Am',
          endTime: '12:30',
          endPeriod: 'Am',
          title: 'Wait is Over! Stony Brook Captures Conference',
          author: 'Riaz Sagar',
          company: 'Logichunt Inc.',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[3], foireGuests[1], foireGuests[2]],
          startTime: '10:30',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'Team With At Least Three Conference Titles',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[1], foireGuests[3], foireGuests[2]],
          startTime: '11:30',
          startPeriod: 'Am',
          endTime: '01:30',
          endPeriod: 'Pm',
          title: 'Building an Awesome Community on Your Website',
          author: 'Joanna Smith, Riaz Sagar & Devid Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '02:00',
          startPeriod: 'Pm',
          endTime: '03:30',
          endPeriod: 'Pm',
          title: 'Hungry Shawnee boys soccer team eyeing conference, sectional title in 2021',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '03:45',
          startPeriod: 'Pm',
          endTime: '04:00',
          endPeriod: 'Pm',
          title: 'Business World Event Introduction',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        }
      ]
    },
    {
      day: '5',
      month: 'Sep',
      year: '2026',
      title: 'Second',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'The Wait is Over! Stony Brook Captures First Conference Title',
          author: 'Joanna Smith, Riaz Sagar & Devid Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '10:30',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'Digital World Event Introduction',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '01:00',
          startPeriod: 'Pm',
          endTime: '02:30',
          endPeriod: 'Pm',
          title: 'Advanced Web Development Techniques',
          author: 'Michael Chen & Sarah Williams',
          company: 'TechCorp Solutions',
          description: 'Deep dive into modern web development practices, including performance optimization, accessibility standards, and cutting-edge frameworks. Interactive session with live coding demonstrations.',
          location: 'Hall 2, Building B, Innovation Campus'
        }
      ]
    },
    {
      day: '6',
      month: 'Sep',
      year: '2026',
      title: 'Third',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Cloud Architecture Fundamentals',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Explore scalable cloud solutions, microservices architecture, and containerization strategies for modern applications. Learn best practices from industry experts.',
          location: 'Conference Room A, Tech Hub'
        },
        {
          guests: [foireGuests[3] , foireGuests[1] , foireGuests[2] ],
          startTime: '11:00',
          startPeriod: 'Am',
          endTime: '12:30',
          endPeriod: 'Pm',
          title: 'AI and Machine Learning in Business',
          author: 'Dr. Robert Martinez',
          company: 'AI Innovations Lab',
          description: 'Understanding how artificial intelligence and machine learning are transforming business operations, customer experiences, and decision-making processes.',
          location: 'Innovation Theater, Main Building'
        }
      ]
    },
    {
      day: '7',
      month: 'Sep',
      year: '2026',
      title: 'Fourth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Cybersecurity Best Practices Workshop',
          author: 'Riaz Sagar & Alex Thompson',
          company: 'SecureNet Systems',
          description: 'Hands-on workshop covering essential cybersecurity practices, threat detection, and incident response strategies for modern enterprises.',
          location: 'Security Lab, Building C'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '02:00',
          startPeriod: 'Pm',
          endTime: '03:30',
          endPeriod: 'Pm',
          title: 'Data Analytics and Visualization',
          author: 'Emily Rodriguez',
          company: 'DataViz Pro',
          description: 'Learn to transform raw data into meaningful insights through effective visualization techniques and analytical methodologies.',
          location: 'Analytics Center, Tower 2'
        }
      ]
    },
    {
      day: '8',
      month: 'Sep',
      year: '2026',
      title: 'Fifth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:30',
          startPeriod: 'Am',
          endTime: '11:00',
          endPeriod: 'Am',
          title: 'Mobile App Development Trends',
          author: 'Joanna Smith & Dr. Robert Martinez',
          company: 'MobileTech Ventures',
          description: 'Discover the latest trends in mobile application development, including cross-platform frameworks, progressive web apps, and native performance optimization.',
          location: 'Mobile Dev Lab, Building D'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '01:00',
          startPeriod: 'Pm',
          endTime: '02:00',
          endPeriod: 'Pm',
          title: 'Agile Project Management Masterclass',
          author: 'Riaz Sagar',
          company: 'Logichunt Inc.',
          description: 'Master agile methodologies, sprint planning, and team collaboration techniques to deliver projects efficiently and effectively.',
          location: 'Executive Suite, Main Campus'
        }
      ]
    },
    {
      day: '9',
      month: 'Sep',
      year: '2026',
      title: 'Sixth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '10:00',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'DevOps Culture and Continuous Integration',
          author: 'Alex Thompson',
          company: 'CloudOps Enterprise',
          description: 'Building a DevOps culture, implementing CI/CD pipelines, and automating deployment processes for faster and more reliable software delivery.',
          location: 'DevOps Center, Building E'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '02:30',
          startPeriod: 'Pm',
          endTime: '04:00',
          endPeriod: 'Pm',
          title: 'Blockchain Technology and Applications',
          author: 'Emily Rodriguez & Dr. Robert Martinez',
          company: 'Blockchain Solutions Inc.',
          description: 'Understanding blockchain fundamentals, smart contracts, and real-world applications across various industries including finance, supply chain, and healthcare.',
          location: 'Innovation Lab, Tech Park'
        }
      ]
    },
    {
      day: '10',
      month: 'Sep',
      year: '2026',
      title: 'Seventh',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'UX/UI Design Principles',
          author: 'Riaz Sagar & Joanna Smith',
          company: 'Design Apple',
          description: 'Creating intuitive and engaging user experiences through thoughtful design principles, user research, and iterative prototyping processes.',
          location: 'Design Studio, Creative Building'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '11:00',
          startPeriod: 'Am',
          endTime: '12:00',
          endPeriod: 'Pm',
          title: 'Startup Funding and Pitch Strategies',
          author: 'Alex Thompson',
          company: 'Venture Capital Partners',
          description: 'Navigate the startup funding landscape, craft compelling pitch decks, and understand what investors look for in early-stage companies.',
          location: 'Investor Forum, Tower 1'
        }
      ]
    },
    {
      day: '11',
      month: 'Sep',
      year: '2026',
      title: 'Eighth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:30',
          startPeriod: 'Am',
          endTime: '11:00',
          endPeriod: 'Am',
          title: 'Internet of Things and Smart Devices',
          author: 'Dr. Robert Martinez',
          company: 'IoT Innovations',
          description: 'Exploring IoT ecosystems, device connectivity, edge computing, and the future of smart devices in homes, cities, and industries.',
          location: 'IoT Lab, Research Center'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '01:30',
          startPeriod: 'Pm',
          endTime: '03:00',
          endPeriod: 'Pm',
          title: 'Digital Marketing in the Modern Age',
          author: 'Joanna Smith & Emily Rodriguez',
          company: 'Marketing Masters',
          description: 'Leveraging digital channels, social media strategies, content marketing, and analytics to build brand awareness and drive customer engagement.',
          location: 'Marketing Hub, Building F'
        }
      ]
    },
    {
      day: '12',
      month: 'Sep',
      year: '2026',
      title: 'Ninth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '10:00',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'API Design and Microservices Architecture',
          author: 'Riaz Sagar',
          company: 'Logichunt Inc.',
          description: 'Best practices for designing RESTful APIs, implementing microservices patterns, and building scalable distributed systems.',
          location: 'API Workshop Room, Tech Campus'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '02:00',
          startPeriod: 'Pm',
          endTime: '03:30',
          endPeriod: 'Pm',
          title: 'Sustainable Technology and Green Computing',
          author: 'Alex Thompson & Dr. Robert Martinez',
          company: 'EcoTech Solutions',
          description: 'Addressing environmental impacts of technology, energy-efficient computing practices, and building sustainable digital infrastructures.',
          location: 'Sustainability Center, Green Building'
        }
      ]
    },
    {
      day: '13',
      month: 'Sep',
      year: '2026',
      title: 'Tenth',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Database Optimization and Performance Tuning',
          author: 'Emily Rodriguez',
          company: 'DataViz Pro',
          description: 'Advanced techniques for optimizing database queries, indexing strategies, and improving overall database performance in high-traffic applications.',
          location: 'Database Lab, Building G'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '11:00',
          startPeriod: 'Am',
          endTime: '01:00',
          endPeriod: 'Pm',
          title: 'Panel Discussion: Future of Technology',
          author: 'Riaz Sagar, Joanna Smith & Alex Thompson',
          company: 'Tech Leaders Forum',
          description: 'Industry leaders discuss emerging technologies, future trends, and the transformative impact of innovation on society and business.',
          location: 'Main Auditorium, Convention Center'
        }
      ]
    },
    {
      day: '14',
      month: 'Sep',
      year: '2026',
      title: 'Eleventh',
      schedules: [
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Cybersecurity Best Practices Workshop',
          author: 'Riaz Sagar & Alex Thompson',
          company: 'SecureNet Systems',
          description: 'Hands-on workshop covering essential cybersecurity practices, threat detection, and incident response strategies for modern enterprises.',
          location: 'Security Lab, Building C'
        },
        {
          guests: [foireGuests[0] , foireGuests[1] , foireGuests[2] ],
          startTime: '11:00',
          startPeriod: 'Am',
          endTime: '12:00',
          endPeriod: 'Pm',
          title: 'Data Analytics and Visualization',
          author: 'Emily Rodriguez',
          company: 'DataViz Pro',
          description: 'Learn to transform raw data into meaningful insights through effective visualization techniques and analytical methodologies.',
          location: 'Analytics Center, Tower 2'
        }
      ]
    }
  ]);

  // Computed properties
  const currentDay = computed(() => scheduleDays.value[selectedDay.value])
  
  const totalDays = computed(() => scheduleDays.value.length)
  
  const totalSchedules = computed(() => 
    scheduleDays.value.reduce((acc, day) => acc + day.schedules.length, 0)
  )

  // Methods
  const setSelectedDay = (index: number) => {
    if (index >= 0 && index < scheduleDays.value.length) {
      selectedDay.value = index
    }
  }

  const getSchedulesByDay = (dayIndex: number) => {
    return scheduleDays.value[dayIndex]?.schedules || []
  }

  const filterPastEvents = () => {
    const now = new Date()
    return scheduleDays.value.filter(day => {
      const eventDate = new Date(`${day.month} ${day.day}, ${day.year}`)
      return eventDate < now
    })
  }

  const filterUpcomingEvents = () => {
    const now = new Date()
    return scheduleDays.value.filter(day => {
      const eventDate = new Date(`${day.month} ${day.day}, ${day.year}`)
      return eventDate >= now
    })
  }

  const features = [
    {
      title: 'Rencontres avec des auteurs',
      description:
        'Échangez avec des écrivains locaux et invités lors de rencontres privilégiées. Lectures publiques, discussions ouvertes et séances de dédicaces offrent des moments uniques de partage autour du livre.',
      image: 'https://picsum.photos/600/400/?blur=2',
    },
    {
      title: 'Ateliers créatifs',
      description:
        'Participez à des ateliers animés par des illustrateurs et artistes passionnés. Bande dessinée, illustration et création graphique sont au cœur de ces espaces d’expérimentation.',
      image: 'https://picsum.photos/600/400/?blur=2',
    },
    {
      title: 'Animations jeunesse',
      description:
        'Des activités ludiques et culturelles pour éveiller la curiosité des plus jeunes et leur faire découvrir l’art, la lecture et l’imaginaire.',
      image: 'https://picsum.photos/600/400/?blur=2',
    },
    {
      title: 'Marché du livre',
      description:
        'Découvrez un espace dédié aux éditeurs indépendants et aux ouvrages alternatifs, favorisant la découverte et la diversité littéraire.',
      image: 'https://picsum.photos/600/400/?blur=2',
    },
  ]

  return {
    // State
    selectedDay,
    scheduleDays,
    features,
    
    // Computed
    currentDay,
    totalDays,
    totalSchedules,
    
    // Methods
    setSelectedDay,
    getSchedulesByDay,
    filterPastEvents,
    filterUpcomingEvents
  }
};