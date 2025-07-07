
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Custom brand colors
				brand: {
					red: '#ce0000',
					blue: '#009ece', 
					yellow: '#f7d708',
					green: '#e4ebe1'
				},
				// Electric effects
				'electric-blue': '#00ffff',
				'electric-purple': '#8a2be2',
				// Rainbow effects
				'rainbow-start': '#ff0080',
				'rainbow-mid': '#00ff80',
				'rainbow-end': '#8000ff',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			gridTemplateColumns: {
				'20': 'repeat(20, minmax(0, 1fr))',
			},
			gridTemplateRows: {
				'20': 'repeat(20, minmax(0, 1fr))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				// New advanced animations
				'aurora': {
					'0%': {
						transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
						opacity: '0.3'
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.2) rotate(120deg)',
						opacity: '0.6'
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.8) rotate(240deg)',
						opacity: '0.4'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1) rotate(360deg)',
						opacity: '0.3'
					}
				},
				'aurora-reverse': {
					'0%': {
						transform: 'translate(0px, 0px) scale(1) rotate(360deg)',
						opacity: '0.2'
					},
					'50%': {
						transform: 'translate(-30px, 30px) scale(1.1) rotate(180deg)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
						opacity: '0.2'
					}
				},
				'orbit': {
					'0%': {
						transform: 'rotate(0deg) translateX(100px) rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg) translateX(100px) rotate(-360deg)'
					}
				},
				'orbit-reverse': {
					'0%': {
						transform: 'rotate(360deg) translateX(80px) rotate(-360deg)'
					},
					'100%': {
						transform: 'rotate(0deg) translateX(80px) rotate(0deg)'
					}
				},
				'lightning': {
					'0%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'10%': {
						opacity: '1',
						transform: 'scaleY(1)'
					},
					'20%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'30%': {
						opacity: '1',
						transform: 'scaleY(1)'
					},
					'40%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'scaleY(0)'
					}
				},
				'lightning-delayed': {
					'0%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'50%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'60%': {
						opacity: '1',
						transform: 'scaleY(1)'
					},
					'70%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'80%': {
						opacity: '1',
						transform: 'scaleY(1)'
					},
					'90%': {
						opacity: '0',
						transform: 'scaleY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'scaleY(0)'
					}
				},
				'shooting-star': {
					'0%': {
						transform: 'translateX(-100px) translateY(0px)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(calc(100vw + 100px)) translateY(-200px)',
						opacity: '0'
					}
				},
				'shooting-star-delayed': {
					'0%': {
						transform: 'translateX(-100px) translateY(0px)',
						opacity: '0'
					},
					'30%': {
						opacity: '0'
					},
					'40%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(calc(100vw + 100px)) translateY(-150px)',
						opacity: '0'
					}
				},
				'shooting-star-slow': {
					'0%': {
						transform: 'translateX(-100px) translateY(0px)',
						opacity: '0'
					},
					'60%': {
						opacity: '0'
					},
					'70%': {
						opacity: '1'
					},
					'95%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(calc(100vw + 100px)) translateY(-100px)',
						opacity: '0'
					}
				},
				'plasma-wave': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(100%)',
						opacity: '0'
					}
				},
				'plasma-wave-reverse': {
					'0%': {
						transform: 'translateX(100%)',
						opacity: '0'
					},
					'50%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					}
				},
				'prism': {
					'0%': {
						transform: 'rotate(0deg) scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg) scale(1.2)',
						filter: 'hue-rotate(360deg)'
					}
				},
				'prism-reverse': {
					'0%': {
						transform: 'rotate(360deg) scale(1.2)',
						filter: 'hue-rotate(360deg)'
					},
					'100%': {
						transform: 'rotate(0deg) scale(1)',
						filter: 'hue-rotate(0deg)'
					}
				},
				'digital-rain': {
					'0%': {
						transform: 'translateY(-100px)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(calc(100vh + 100px))',
						opacity: '0'
					}
				},
				'blob': {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)'
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(0deg)'
					},
					'50%': {
						transform: 'translateY(-20px) rotate(180deg)'
					}
				},
				'slide': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				},
				'spin-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'wave': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(100%)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				// New advanced animations
				'aurora': 'aurora 15s ease-in-out infinite',
				'aurora-reverse': 'aurora-reverse 20s ease-in-out infinite',
				'orbit': 'orbit 10s linear infinite',
				'orbit-reverse': 'orbit-reverse 12s linear infinite',
				'lightning': 'lightning 3s ease-in-out infinite',
				'lightning-delayed': 'lightning-delayed 4s ease-in-out infinite',
				'shooting-star': 'shooting-star 6s linear infinite',
				'shooting-star-delayed': 'shooting-star-delayed 8s linear infinite',
				'shooting-star-slow': 'shooting-star-slow 10s linear infinite',
				'plasma-wave': 'plasma-wave 5s linear infinite',
				'plasma-wave-reverse': 'plasma-wave-reverse 7s linear infinite',
				'prism': 'prism 8s linear infinite',
				'prism-reverse': 'prism-reverse 6s linear infinite',
				'digital-rain': 'digital-rain 4s linear infinite',
				'blob': 'blob 7s infinite',
				'float': 'float 6s ease-in-out infinite',
				'slide': 'slide 20s linear infinite',
				'spin-slow': 'spin-slow 8s linear infinite',
				'wave': 'wave 4s linear infinite'
			},
			animationDelay: {
				'2000': '2s',
				'4000': '4s'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			const newUtilities = {
				'.animation-delay-2000': {
					'animation-delay': '2s'
				},
				'.animation-delay-4000': {
					'animation-delay': '4s'
				}
			};
			addUtilities(newUtilities);
		}
	],
} satisfies Config;
