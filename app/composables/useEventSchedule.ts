export interface Schedule {
  speakers: string[]
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

export const useEventSchedule = () => {
  const selectedDay = ref(0)

  const scheduleDays = ref<ScheduleDay[]>([
    {
      title: 'First',
      day: '29',
      month: 'Nov',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker1.jpg'],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Wait is Over! Stony Brook Captures Conference',
          author: 'Riaz Sagar',
          company: 'Logichunt Inc.',
          description: 'Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8-bit hella, PBR 3 wolf moon beard Helvetica. Salvia esse flexitarian Truffaut synth art party deep v chillwave.',
          location: 'Hall 1, Building A, Golden Street, Southafrica'
        },
        {
          speakers: ['/img/speaker2.jpg'],
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
          speakers: ['/img/speaker1.jpg', '/img/speaker2.jpg', '/img/speaker3.jpg', '/img/speaker4.jpg'],
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
          speakers: ['/img/speaker4.jpg'],
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
          speakers: ['/img/speaker5.jpg'],
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
      title: 'Second',
      day: '30',
      month: 'Nov',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker2.jpg', '/img/speaker3.jpg'],
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
          speakers: ['/img/speaker1.jpg'],
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
          speakers: ['/img/speaker3.jpg', '/img/speaker4.jpg'],
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
      title: 'Third',
      day: '01',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker2.jpg'],
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
          speakers: ['/img/speaker5.jpg'],
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
      title: 'Fourth',
      day: '02',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker3.jpg'],
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
          speakers: ['/img/speaker4.jpg'],
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
      title: 'Fifth',
      day: '03',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker2.jpg', '/img/speaker5.jpg'],
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
          speakers: ['/img/speaker1.jpg'],
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
      title: 'Sixth',
      day: '04',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker3.jpg'],
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
          speakers: ['/img/speaker4.jpg', '/img/speaker5.jpg'],
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
      title: 'Seventh',
      day: '05',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker2.jpg'],
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
          speakers: ['/img/speaker3.jpg'],
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
      title: 'Eighth',
      day: '06',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker5.jpg'],
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
          speakers: ['/img/speaker2.jpg', '/img/speaker4.jpg'],
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
      title: 'Ninth',
      day: '07',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker1.jpg'],
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
          speakers: ['/img/speaker3.jpg', '/img/speaker5.jpg'],
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
      title: 'Tenth',
      day: '08',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker4.jpg'],
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
          speakers: ['/img/speaker1.jpg', '/img/speaker2.jpg', '/img/speaker3.jpg'],
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
      title: 'Eleventh',
      day: '09',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker2.jpg'],
          startTime: '09:30',
          startPeriod: 'Am',
          endTime: '11:00',
          endPeriod: 'Am',
          title: 'E-Commerce Platform Development',
          author: 'Joanna Smith',
          company: 'Design Apple',
          description: 'Building robust e-commerce platforms with payment integration, inventory management, and customer experience optimization strategies.',
          location: 'E-Commerce Lab, Digital Center'
        },
        {
          speakers: ['/img/speaker5.jpg'],
          startTime: '02:00',
          startPeriod: 'Pm',
          endTime: '03:30',
          endPeriod: 'Pm',
          title: 'Quantum Computing: Present and Future',
          author: 'Dr. Robert Martinez',
          company: 'Quantum Research Institute',
          description: 'Introduction to quantum computing principles, current state of quantum technology, and potential applications that could revolutionize computing.',
          location: 'Quantum Lab, Research Tower'
        }
      ]
    },
    {
      title: 'Twelfth',
      day: '10',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker3.jpg'],
          startTime: '10:00',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'Network Security and Penetration Testing',
          author: 'Alex Thompson',
          company: 'SecureNet Systems',
          description: 'Practical approaches to network security assessment, ethical hacking techniques, and vulnerability management in enterprise environments.',
          location: 'Security Training Center, Building H'
        },
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker4.jpg'],
          startTime: '01:00',
          startPeriod: 'Pm',
          endTime: '02:30',
          endPeriod: 'Pm',
          title: 'Serverless Architecture and Cloud Functions',
          author: 'Riaz Sagar & Emily Rodriguez',
          company: 'Cloud Native Inc.',
          description: 'Implementing serverless architectures, understanding function-as-a-service platforms, and optimizing costs in cloud-native applications.',
          location: 'Cloud Computing Center, Tower 3'
        }
      ]
    },
    {
      title: 'Thirteenth',
      day: '11',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker5.jpg', '/img/speaker2.jpg'],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '10:30',
          endPeriod: 'Am',
          title: 'Augmented Reality and Virtual Reality Applications',
          author: 'Dr. Robert Martinez & Joanna Smith',
          company: 'Immersive Tech Labs',
          description: 'Exploring AR/VR technologies, development frameworks, and real-world applications in gaming, education, training, and enterprise solutions.',
          location: 'VR Experience Center, Innovation Wing'
        },
        {
          speakers: ['/img/speaker3.jpg'],
          startTime: '02:30',
          startPeriod: 'Pm',
          endTime: '04:00',
          endPeriod: 'Pm',
          title: 'Leadership in Tech: Building High-Performance Teams',
          author: 'Alex Thompson',
          company: 'Leadership Academy',
          description: 'Developing leadership skills, fostering team collaboration, and creating cultures of innovation and excellence in technology organizations.',
          location: 'Leadership Forum, Executive Building'
        }
      ]
    },
    {
      title: 'Fourteenth',
      day: '12',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker4.jpg'],
          startTime: '10:00',
          startPeriod: 'Am',
          endTime: '11:30',
          endPeriod: 'Am',
          title: 'Natural Language Processing and Chatbots',
          author: 'Emily Rodriguez',
          company: 'AI Innovations Lab',
          description: 'Building intelligent conversational interfaces using NLP techniques, understanding language models, and creating effective chatbot experiences.',
          location: 'AI Lab, Research Building'
        },
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker5.jpg'],
          startTime: '01:00',
          startPeriod: 'Pm',
          endTime: '02:30',
          endPeriod: 'Pm',
          title: 'Software Testing and Quality Assurance',
          author: 'Riaz Sagar & Dr. Robert Martinez',
          company: 'Quality Systems Inc.',
          description: 'Comprehensive testing strategies, automated testing frameworks, continuous testing practices, and ensuring software quality at scale.',
          location: 'QA Center, Building I'
        }
      ]
    },
    {
      title: 'Fifteenth',
      day: '13',
      month: 'Dec',
      year: '2021',
      schedules: [
        {
          speakers: ['/img/speaker2.jpg', '/img/speaker3.jpg', '/img/speaker4.jpg'],
          startTime: '09:00',
          startPeriod: 'Am',
          endTime: '11:00',
          endPeriod: 'Am',
          title: 'Closing Keynote: Technology and Human Connection',
          author: 'Joanna Smith, Alex Thompson & Emily Rodriguez',
          company: 'Tech for Humanity',
          description: 'Reflecting on technology\'s role in bringing people together, ethical considerations in tech development, and building technology that serves humanity.',
          location: 'Grand Hall, Convention Center'
        },
        {
          speakers: ['/img/speaker1.jpg', '/img/speaker2.jpg', '/img/speaker3.jpg', '/img/speaker4.jpg', '/img/speaker5.jpg'],
          startTime: '02:00',
          startPeriod: 'Pm',
          endTime: '04:00',
          endPeriod: 'Pm',
          title: 'Networking Reception and Closing Ceremony',
          author: 'All Speakers',
          company: 'Event Organizers',
          description: 'Join us for the final networking reception where attendees can connect with speakers, share insights, and celebrate the success of this amazing conference journey.',
          location: 'Rooftop Terrace, Main Building'
        }
      ]
    }
  ])

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