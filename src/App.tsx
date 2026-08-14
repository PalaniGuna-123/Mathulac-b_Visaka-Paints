import { BrowserRouter } from './routes/Router';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';

export default function App() {
  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
}
