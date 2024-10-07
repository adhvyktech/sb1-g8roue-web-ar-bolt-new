import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarkerUpload from '@/components/MarkerUpload';
import OutputUpload from '@/components/OutputUpload';
import PreviewSection from '@/components/PreviewSection';
import GenerateARExperience from '@/components/GenerateARExperience';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Web AR Platform</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <MarkerUpload />
            <OutputUpload />
          </div>
          <PreviewSection />
        </div>
        <GenerateARExperience />
      </main>
      <Footer />
    </div>
  );
}