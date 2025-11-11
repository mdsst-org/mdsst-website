// app/contact/page.tsx
export const metadata = {
  title: "Contact — MDSS",
  description: "Get in touch with Maa Durga Seva Sansthan",
};

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-red-800 mb-6">Contact Us</h1>

      <form action="https://formspree.io/f/yourFormId" method="POST" className="grid gap-4">
        <input className="border p-3 rounded" type="text" name="name" placeholder="Your Name" required />
        <input className="border p-3 rounded" type="email" name="_replyto" placeholder="Your Email" required />
        <textarea className="border p-3 rounded" name="message" placeholder="Your Message" rows={5} required />
        <button className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-600" type="submit">
          Send Message
        </button>
      </form>

      <div className="mt-8">
        <p>Email: <a href="mailto:info@mdsst.org" className="underline">info@mdsst.org</a></p>
        <p>Address: [Your registered office address]</p>
      </div>
    </div>
  );
}
