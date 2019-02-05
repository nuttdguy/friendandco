# *Purpose*
Allow individuals to create meaningful connections with others by doing activities together.

## *Todo steps (backend)*

- [ ] User and Authentication domain
    - [ ] jwt auth
    - [ ] google auth
- [ ] Activity domain
    - [ ] viewing
    - [ ] listing
    - [ ] leading
    - [ ] participating
    - [ ] matching
        - [ ] tagging
- [ ] Profile domain
    - [ ] history (activity)
    - [ ] tagging

    
### *User-flow*

> unregistered
- [ ] home (view all listings) => signup => send confirm => register user

> registered
- [ ] home (sign-in) => build profile (ask questions) => show activity matches
- [ ] home (sign-in) => show activities (matched)
- [ ] home (sign-in) => show activities (new listings)
- [ ] home (sign-in) => show activities (new listings) => add listing
- [ ] home (sign-in) => show activities (new listings) => build profile (ask questions - self) => show activities (matches)
- [ ] home (sign-in) => show activities (new listings) => build profile (ask questions - others) => show activities (matches)
- [ ] home (sign-in) => show activities (new listings) => build profile (ask questions - participated) => show activities (matches)
- [ ] home (sign-in) => build profile (ask questions - others) => show activities (new listings)
- [ ] home (sign-in) => build profile (ask questions - participated) => show activities (new listings)
- [ ] home (sign-in) => build profile (ask questions - self) => show activities (new listings)


## *Todo steps (frontend)*

- [ ] Routes
    - [ ] Authentication
    - [  ] Activity
    - [ ] Profile
    
- [ ] Views
    - [ ] Activity
    - [ ] Profile
    - [ ] Home