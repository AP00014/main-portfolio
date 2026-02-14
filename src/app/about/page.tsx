import { Heart, Target, User } from "lucide-react";
import Card from "@/components/UI/Card";

export default function AboutPage() {
  return (
    <div id="about" className="mx-auto max-w-4xl space-y-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Learn more about my journey, values, and approach to development.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">My Story</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              I started my journey in software development with a passion for
              solving complex problems through code. Over the years, I&apos;ve
              worked on diverse projects ranging from small startups to
              enterprise applications.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              My philosophy is simple: build intuitive, efficient, and scalable
              solutions that make a difference while staying curious and
              learning every day.
            </p>
          </Card>

          <Card>
            <div className="mb-6 flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Passions</h2>
            </div>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>
                  <strong>Intelligent Systems:</strong> Exploring how smart
                  automation can enhance user experiences.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>
                  <strong>Open Source:</strong> Contributing to and learning from
                  the community.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-2 h-2 w-2 rounded-full bg-primary" />
                <span>
                  <strong>UI/UX Design:</strong> Creating beautiful and functional
                  interfaces.
                </span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <div className="mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-bold">Approach</h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-primary">Problem-First Thinking</h3>
                <p className="text-sm">
                  I start by understanding the core problem before jumping to
                  solutions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Iterative Development</h3>
                <p className="text-sm">
                  Build, test, learn, and repeat. Quick iterations lead to better
                  outcomes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Clean Code Principles</h3>
                <p className="text-sm">
                  Writing maintainable, scalable, and well-documented code.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="mb-6 text-2xl font-bold">Fun Facts</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Technologies
                </div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Passion
                </div>
              </div>
            </div>
          </Card>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            Ask the Assistant: &quot;Tell me more about yourself&quot; or
            &quot;What are your passions?&quot;
          </div>
        </div>
      </div>
    </div>
  );
}
