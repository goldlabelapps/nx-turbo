export interface FooterProps {
  githubUrl?: string;
}

export function Footer({ githubUrl = "https://github.com/goldlabelapps/nx-turbo" }: FooterProps) {
  return (
    <footer className="np-footer">
      <div className="np-footer-inner">
        <a
          className="np-footer-github-link"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
