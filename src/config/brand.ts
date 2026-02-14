// Brand configuration for APX dual websites
export const brandConfig = {
  current: 'FS' as 'MEP' | 'FS',
  domains: {
    MEP: 'apx-mep.com',
    FS: 'apx-fs.com'
  },
  content: {
    MEP: {
      name: 'APX MEP',
      tagline: 'Professional Mechanical & Electrical',
      subtitle: 'MEP Services & Solutions',
      description: 'Expert MEP services, certified professionals, reliable solutions.',
      services: [
        {
          title: 'Mechanical Systems',
          description: 'HVAC, plumbing, and mechanical systems installation, maintenance, and repair services.',
          icon: 'Wrench'
        },
        {
          title: 'Electrical Services', 
          description: 'Full electrical services from installation to maintenance and emergency repairs.',
          icon: 'Zap'
        },
        {
          title: 'Plumbing Systems',
          description: 'Complete plumbing solutions including installation, maintenance, and emergency repairs.',
          icon: 'Shield'
        }
      ],
      whyChoose: {
        title: 'Why Choose APX MEP?',
        description: 'With over 20 years of experience in mechanical, electrical, and plumbing services, we\'ve built a reputation for excellence, reliability, and customer satisfaction across the UK.',
        features: [
          {
            title: 'Certified MEP Engineers',
            description: 'All our engineers are fully qualified and certified in MEP systems'
          },
          {
            title: '24/7 Emergency Service',
            description: 'Round-the-clock MEP support when you need it most'
          },
          {
            title: 'Quality Guarantee',
            description: 'All MEP work comes with comprehensive warranties'
          }
        ]
      }
    },
    FS: {
      name: 'APX FS',
      tagline: 'Professional Fire & Security',
      subtitle: 'Fire Safety & Security Solutions',
      description: 'Expert fire safety and security services, certified professionals, reliable solutions.',
      services: [
        {
          title: 'Fire Safety Systems',
          description: 'Complete fire safety solutions including alarms, sprinklers, and emergency lighting systems.',
          icon: 'Shield'
        },
        {
          title: 'Security Systems',
          description: 'Advanced CCTV, access control, and intruder alarm systems for complete protection.',
          icon: 'Shield'
        },
        {
          title: 'Emergency Systems',
          description: 'Emergency lighting, fire suppression, and life safety systems installation and maintenance.',
          icon: 'Zap'
        }
      ],
      whyChoose: {
        title: 'Why Choose APX FS?',
        description: 'With over 20 years of experience in fire safety and security services, we\'ve built a reputation for excellence, reliability, and customer satisfaction across the UK.',
        features: [
          {
            title: 'Certified FS Engineers',
            description: 'All our engineers are fully qualified and certified in fire safety and security systems'
          },
          {
            title: '24/7 Emergency Service',
            description: 'Round-the-clock fire safety and security support when you need it most'
          },
          {
            title: 'Quality Guarantee',
            description: 'All fire safety and security work comes with comprehensive warranties'
          }
        ]
      }
    }
  }
}

export const getCurrentBrand = () => brandConfig.content[brandConfig.current]
export const getOtherBrand = () => brandConfig.current === 'MEP' ? 'FS' : 'MEP'
