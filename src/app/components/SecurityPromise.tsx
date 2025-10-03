// src/app/components/SecurityPromise.tsx

const securityPoints = [
    { title: "End-to-End Encryption", description: "Your responses are encrypted from the moment you submit them until they're processed, ensuring complete data privacy.", icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
    { title: "Zero Data Sharing", description: "Your behavioral intelligence is never shared, sold, or used to train models for other users. It remains exclusively yours.", icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l14.14 14.14" /></svg> },
    { title: "Secure Infrastructure", description: "Built on enterprise-grade cloud infrastructure with multiple security layers and regular security audits.", icon: <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> }
];

const SecurityPromise = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-8 sm:p-12 shadow-lg border border-blue-200/30">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your Data is Completely Protected</h3>
                    <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                        We understand that your sales intelligence and behavioral patterns represent your most valuable competitive advantage. That's why we've implemented enterprise-grade security protocols to ensure your data remains exclusively yours.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {securityPoints.map((point, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-md">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                {point.icon}
                            </div>
                            <h4 className="font-bold text-gray-800 mb-3">{point.title}</h4>
                            <p className="text-gray-600 text-sm">{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SecurityPromise;
