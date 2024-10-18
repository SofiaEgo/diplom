import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingButton from '../components/FloatingButton';
import GradientBackground from '../components/GradientBackground'; 
import ChatFloatingButton from '../components/ChatFloatingButton'; 

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <GradientBackground />
      <Header />  
      <main className="flex-grow container mx-auto p-6">{children}</main>
      <Footer />
      <FloatingButton />
      <ChatFloatingButton /> 
    </div>
  );
};

export default MainLayout;
