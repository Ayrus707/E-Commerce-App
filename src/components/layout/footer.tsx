export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>&copy; {currentYear} Made by Surya Sharma.</p>
        {/* Add more footer links or information here if needed */}
      </div>
    </footer>
  );
}
