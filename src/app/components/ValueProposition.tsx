// src/app/components/ValueProposition.tsx
'use client';

// Data for the value proposition cards
const valueProps = [
    { title: "Your Revenue Personality", description: "Voice, tone, and energy that mirrors your revenue-generating charisma. Your prospects won't just see an AI—they'll experience the same compelling value proposition." },
    { title: "Revenue Logic Engine", description: "Your proven pattern recognition for qualifying high-value opportunities and spotting revenue-generating prospects. It analyzes and acts on profit potential exactly like you do." },
    { title: "Revenue Communication System", description: "The rhythm, language, and timing that consistently drive high-value conversions. Your AI will communicate with your revenue-generating style—strategically and persuasively." },
    { title: "Revenue Closing System", description: "Your proven methodology for maximizing deal value. It identifies optimal pricing points, recognizes revenue signals, and executes your closing strategies." },
    { title: "Revenue Relationship Engine", description: "Multi-conversation intelligence that builds high-value, revenue-generating relationships over time, creating lasting client partnerships." },
    { title: "Revenue Intelligence Analytics", description: "Advanced performance tracking that continuously learns from every interaction to optimize revenue generation, becoming more profitable over time." }
];

const ValueProposition = () => {
    return (
        <div className="w-full py-16 bg-gray-50 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Your AI Revenue Engine Delivers:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {valueProps.map((prop, index) => (
                        <div key={index} className="group flex flex-col items-center text-center p-8 bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-foreground text-xl mb-4 group-hover:text-green-600 transition-colors">{prop.title}</h4>
                            <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ValueProposition;
