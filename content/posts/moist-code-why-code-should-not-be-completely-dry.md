---
title: Moist code - Why code should not be completely DRY
slug: moist-code-why-code-should-not-be-completely-dry
date_published: 2020-08-21T13:08:00.000Z
date_updated: 2020-08-21T13:08:00.000Z
excerpt: At some point, each developer encounters the term “dry code”. It comes from the acronym DRY for “Don’t repeat yourself”. But if code is too dry, it easily can become brittle. To keep the code moldable, it is helpful to leave in a bit of repetition - a concept I personally like to call “Moist code”.
---

At some point, each developer encounters the term “dry code”. It comes from the acronym DRY for “Don’t repeat yourself”. But if code is too dry, it easily can become brittle. To keep the code moldable, it is helpful to leave in a bit of repetition - a concept I personally like to call “Moist code”.

## A simple example

The core idea behind “Don’t repeat yourself” is, as the name suggests, to not repeat code. Let’s look at a simple example in TypeScript React:

    export function App () {
      return <>
        <nav><h2>Navigation</h2></nav>
        <main>This is the homepage</main>
      </>
    }

So far, there isn't much repetition. Let's add a contact page:

    export function App () {
      const location = useLocation()
      if (location === '/contact') {
        return <>
          <nav>
            <h2>Navigation</h2>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </nav>
          <main>
            This is the homepage
          </main>
        </>
      }

      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </nav>
        <main>
          Contact us!
        </main>
      </>
    }

Now we have a a bit of duplication. Time to split our paths and see the difference between **dry** and **moist** code.

## Dry code

Let's remove as much repetition as possible:

    export function App () {
      const location = useLocation()
      return <>
        <Navigation />
        <Router location={location} />
      </>
     }

    function Navigation () {
      return (
        <nav>
          <h2>Navigation</h2>
          <ul>
            {
              [{
                children: 'Home',
                to: '/'
              }, {
                children: 'Contact',
                to: '/contact'
              }].map(props => <NavLink ...props key={to} />)
            }
         </ul>
        </nav>
      )
    }

    function NavLink ({ to, children }) {
      return <li><Link to={to}>{children}</Link></li>
    }

    function Router ({ location }) {
      return <main><Content location={location} /></main>
    }

    function Content ({ location }) {
      if (location === '/profile') {
        return 'Contact us!'
      }
      return 'This is the homepage'
    }

We have removed every repetition we could find. Time to add the next feature. We want a login page, and users that are not logged in, should automatically see the login form instead of any other page:

    export function App () {
      const location = useLocation()
      return <>
        <Navigation />
        <Router location={location} />
      </>
     }

    function Navigation () {
      return (
        <nav>
          <h2>Navigation</h2>
          <ul>
            {
              [{
                children: 'Home',
                to: '/'
              }, {
                children: 'Contact',
                to: '/contact'
              }, {
                children: 'Login',
                to: '/login'
              }].map(props => <NavLink ...props key={to} />)
            }
         </ul>
        </nav>
      )
    }

    function NavLink ({ to, children }) {
      return <li><Link to={to}>{children}</Link></li>
    }

    function Router ({ location }) {
      return <main><Content location={location} /></main>
    }

    function Content ({ location }) {
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn || location === '/login') {
        return 'This is a login form'
      }
      if (location === '/profile') {
        return 'Contact us!'
      }
     return 'This is the homepage'
    }

Thanks to the strict removal of duplication, we only had to add another link object in the NavBar and another if statement with new content in the `Content` component.

Our app is growing, and we have a UX team now. After some user testing they figured out that it is really confusing to see the `Navigation` on the login screen, even though seemingly none of the links work. So let's fix this by not showing any links in the `NavBar` on the login page:

    export function App () {
      const location = useLocation()
      return <>
        <Navigation location={location} />
        <Router location={location} />
      </>
     }

    function Navigation ({ location }) {
     return (
        <nav>
          <h2>Navigation</h2>
          { location !== '/login' && <NavLinks /> }
       </nav>
      )
    }

    function NavLinks () {
      return <ul>
        {
          [{
            children: 'Home',
            to: '/'
          }, {
            children: 'Contact',
            to: '/contact'
          }, {
            children: 'Login',
            to: '/login'
          }].map(props => <NavLink ...props key={to} />)
        }
      </ul>
    }

    function NavLink ({ to, children }) {
      return <li><Link to={to}>{children}</Link></li>
    }

    function Router ({ location }) {
      return <main><Content location={location} /></main>
    }

    function Content ({ location }) {
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn || location === '/login') {
        return 'This is a login form'
      }
      if (location === '/contact') {
        return 'Contact us!'
      }
     return 'This is the homepage'
    }

Again, thanks to the small amount of duplication, the change is small and easy. But something starts to feel off about the code. Let's see what happens after the next feature.

Our marketing team just called. They had this great idea for a special easter promotion: They want to hide a special easter egg on the page, where if you click the login link on the contacts page, it will instead redirect you to the promotion website. It's just a change in a link, so how hard can it be?

    export function App () {
      const location = useLocation()
      return <>
        <Navigation location={location} />
        <Router location={location} />
      </>
     }

    function Navigation ({ location }) {
     return (
        <nav>
          <h2>Navigation</h2>
          { location !== '/login' && <NavLinks location={location} /> }
       </nav>
      )
    }

    function NavLinks ({ location }) {
      return <ul>
        {
          [{
            children: 'Home',
            to: '/'
          }, {
            children: 'Contact',
            to: '/contact'
          }, {
            children: 'Login',
            to: location === '/contact'
              ? 'https:///our-special-promotion.com'
              : '/login'
          }].map(props => <NavLink ...props />)
        }
      </ul>
    }

    function NavLink ({ to, children }) {
      return <li><Link to={to}>{children}</Link></li>
    }

    function Router ({ location }) {
      return <main><Content location={location} /></main>
    }

    function Content ({ location }) {
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn || location === '/login') {
        return 'This is a login form'
      }
      if (location === '/contact') {
        return 'Contact us!'
      }
     return 'This is the homepage'
    }

Let's look at our moist code team, to see how they are doing.

## Moist code

In moist space, we still have the starting code:

    export function App () {
      const location = useLocation()
      if (location === '/contact') {
        return <>
          <nav>
            <h2>Navigation</h2>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </nav>
          <main>
            This is the homepage
          </main>
        </>
      }

      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </nav>
        <main>
          Contact us!
        </main>
      </>
    }

We don't mind a bit of repetition, so instead of refactoring right away, let's add the next feature first, the login page:

    export function App () {
      const location = useLocation()
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn) {
        return <>
          <nav>
            <h2>Navigation</h2>
          </nav>
          <main>
            This is a login form
          </main>
        </>
      }

      if (location === '/login') {
        return <>
          <nav>
            <h2>Navigation</h2>
          </nav>
          <main>
            This is a login form
          </main>
        </>
      }

      if (location === '/contact') {
        return <>
          <nav>
            <h2>Navigation</h2>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
          <main>
            Contact us!
          </main>
        </>
      }

      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
        <main>
          This is the homepage
        </main>
      </>
    }

Let's extract some of the concepts that seem to emerge, but not too many:

    export function App () {
      const location = useLocation()
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn) {
        return <LoginPage />
      }

      return <Router />
    }

    function Router ({ location }) {
      if (location === '/login') {
        return <LoginPage />
      }

      if (location === '/contact') {
        return <ContactPage />
      }

      return <HomePage />
    }

    function LoginPage () {
      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
       </nav>
        <main>
          This is a login form
        </main>
      </>
    }

    function ContactPage () {
      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
        <main>
          Contact us!
        </main>
      </>
    }

    function HomePage () {
      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
        <main>
          This is the homepage
        </main>
      </>
    }

There is still some repetition left and our fingers might be itching to remove it, but let's add the next feature first: Not showing links on the login page:

    export function App () {
      const location = useLocation()
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn) {
        return <LoginPage />
      }

      return <Router />
    }

    function Router ({ location }) {
      if (location === '/login') {
        return <LoginPage />
      }

      if (location === '/contact') {
        return <ContactPage />
      }

      return <HomePage />
    }

    function LoginPage () {
      return <>
        <nav>
          <h2>Navigation</h2>
       </nav>
        <main>
          This is a login form
        </main>
      </>
    }

    function ContactPage () {
      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
        <main>
          Contact us!
        </main>
      </>
    }

    function HomePage () {
      return <>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </nav>
        <main>
          This is the homepage
        </main>
      </>
    }

That was easy. We literally just had to delete a couple lines. With our new knowledge about how our `Navigation` can change, let's now extract it:

    export function App () {
      const location = useLocation()
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn) {
        return <LoginPage />
      }

      return <Router />
    }

    function Router ({ location }) {
      if (location === '/login') {
        return <LoginPage />
      }

      if (location === '/contact') {
        return <ContactPage />
      }

      return <HomePage />
    }

    function LoginPage () {
      return <>
        <Navigation />
        <main>
          This is a login form
        </main>
      </>
    }

    function ContactPage () {
      return <>
        <Navigation
          links={[{
            children='Home'
            to='/'
          }, {
            children='Contact'
            to='/contact'
          }, {
            children='Login'
            to='/login'
          }]}
        />
        <main>
          Contact us!
        </main>
      </>
    }

    function HomePage () {
      return <>
        <Navigation
          links={[{
            children='Home'
            to='/'
          }, {
            children='Contact'
            to='/contact'
          }, {
            children='Login'
            to='/login'
          }]}
        />
        <main>
          This is the homepage
        </main>
      </>
    }

    function Navigation ({ links }) {
      return (
        <nav>
          <h2>Navigation</h2>
          { links &&
            <ul>
              {
                links.map({ children, to } =>
                  <li key={to}><Link to={to}>{children}</Link></li>)
              }
           </ul>
          }
        </nav>
      )
    }

Even though there is a lot more repetition in this code then in the last version (e. g. each page having to explicitly use `main`), it already feels a bit cleaner and more lightweight. Let's see what happens with the marketing request to have a special link for the easter egg hunt:

    export function App () {
      const location = useLocation()
      const isUserLoggedIn = useLoggedInState()
      if (!isUserLoggedIn) {
        return <LoginPage />
      }

      return <Router />
    }

    function Router ({ location }) {
      if (location === '/login') {
        return <LoginPage />
      }

      if (location === '/contact') {
        return <ContactPage />
      }

      return <HomePage />
    }

    function LoginPage () {
      return <>
        <Navigation />
        <main>
          This is a login form
        </main>
      </>
    }

    function ContactPage () {
      return <>
        <Navigation
          links={[{
            children='Home'
            to='/'
          }, {
            children='Contact'
            to='/contact'
          }, {
            children='Login'
            to='https:///our-special-promotion.com'
          }]}
        />
        <main>
          Contact us!
        </main>
      </>
    }

    function HomePage () {
      return <>
        <Navigation
          links={[{
            children='Home'
            to='/'
          }, {
            children='Contact'
            to='/contact'
          }, {
            children='Login'
            to='/login'
          }]}
        />
        <main>
          This is the homepage
        </main>
      </>
    }

    function Navigation ({ links }) {
      return (
        <nav>
          <h2>Navigation</h2>
          { links &&
            <ul>
              {
                links.map({ children, to } =>
                  <li key={to}><Link to={to}>{children}</Link></li>)
              }
           </ul>
          }
        </nav>
      )
    }

One link replaced. That's it.

## What happened?

The main difference between our two approaches is that with the moist code approach, we gave the code more time to dry. Instead of forcing it into a specific form early on based on assumptions only, we first collected a bit more requirements and only then started removing repetition.

This lead us to use the pattern of composition instead of inheritance for the `Navigation`, which made it easier to individualize the `Navigation` by route and gave us more flexibility for changing the code in the places that actually mattered for our new features.

## Conclusions

When writing code we usually don't know from the beginning every requirement that will come ahead. Especially for web applications the requirements might never fully settled and always keep in motion. If we optimize our code only step-by-step as we discover the requirements, we can keep it moist and malleable. If we aim for perfectly DRY code, it will become brittle and inflexible to change.
