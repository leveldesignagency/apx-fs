# APX Dual-Brand Website Setup

This website is designed to support two separate brands under the APX umbrella:

## 🏢 **Brands**

### 1. **APX MEP** (Current)
- **Domain**: `apx-mep.com`
- **Focus**: Mechanical, Electrical, and Plumbing services
- **Services**: HVAC, electrical systems, plumbing solutions

### 2. **APX FS** (Fire & Security)
- **Domain**: `apx-fs.com` 
- **Focus**: Fire Safety and Security services
- **Services**: Fire alarms, CCTV, access control, emergency systems

## 🔄 **How It Works**

### Current Setup
- The website is currently configured for **MEP** services
- A "Switch to FS" button is visible in the header
- All content is MEP-focused

### To Create the FS Version
1. **Duplicate the entire project** to a new folder
2. **Update the brand configuration** in `src/config/brand.ts`:
   ```typescript
   current: 'FS' as 'MEP' | 'FS'
   ```
3. **Update the switch button** to say "Switch to MEP"
4. **Deploy to the FS domain**

## 📁 **File Structure**

```
Website/
├── apx-website/          # MEP version (current)
│   ├── src/
│   │   ├── config/
│   │   │   └── brand.ts  # Brand configuration
│   │   ├── components/
│   │   └── app/
│   └── ...
└── apx-fs-website/       # FS version (to be created)
    ├── src/
    │   ├── config/
    │   │   └── brand.ts  # Updated for FS
    │   ├── components/
    │   └── app/
    └── ...
```

## 🎨 **Design Consistency**

Both websites will have:
- **Identical black and white design**
- **Same layout and structure**
- **Same navigation and footer**
- **Only content changes** (services, descriptions, etc.)

## 🚀 **Deployment Strategy**

### MEP Website
- Deploy to `apx-mep.com`
- Vercel project: `apx-mep`
- GitHub repo: `apx-mep-website`

### FS Website  
- Deploy to `apx-fs.com`
- Vercel project: `apx-fs`
- GitHub repo: `apx-fs-website`

## 🔧 **Customization Points**

When creating the FS version, update these areas:

1. **Hero Section**: Change tagline and description
2. **Services**: Update to fire safety and security services
3. **Why Choose Us**: Update to FS-specific benefits
4. **Testimonials**: Update to FS-related testimonials
5. **Footer**: Update contact info and service links
6. **Meta Tags**: Update SEO content for FS

## 📝 **Next Steps**

1. **Test the current MEP version** thoroughly
2. **Customize content** as needed for MEP
3. **Deploy MEP version** to production
4. **Duplicate project** for FS version
5. **Update FS content** using the brand config
6. **Deploy FS version** to production

## 💡 **Benefits of This Setup**

- **Consistent branding** across both sites
- **Easy maintenance** - update design once, apply to both
- **Separate domains** for better SEO
- **Focused messaging** for each service area
- **Professional appearance** for both brands
