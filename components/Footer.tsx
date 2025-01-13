import { V0Logo } from './v0logo';

const Footer = () => (
  <footer>
    <div className="custom-screen pt-16">
      <div className="mt-10 py-10 border-t items-center justify-between flex">
        <p className="text-gray-600">
          Created by{' '}
          <a
            href="https://twitter.com/nutlope"
            className="hover:underline transition"
          >
            Hassan
          </a>{' '}
          and{' '}
          <a
            href="https://twitter.com/kevinhou22"
            className="hover:underline transition"
          >
            Kevin
          </a>
          .
        </p>

      </div>
    </div>
  </footer>
);

export default Footer;
