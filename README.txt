  _________                      __       .___
 /   _____/ _____ _____    ____ |  | __ __| _/______  _  ______  
 \_____  \ /     \\__  \ _/ ___\|  |/ // __ |/  _ \ \/ \/ /    \
 /        \  Y Y  \/ __ \\  \___|    </ /_/ (  <_> )     /   |  \
/_______  /__|_|  (____  /\___  >__|_ \____ |\____/ \/\_/|___|  /
        \/      \/     \/     \/     \/    \/                 \/

Installation Instructions
  - Enable the Node Reference and Content Copy modules _before_ you enable 
    Smackdown module. Do _not_ enable them at the same time or you will get an 
    error when Smackdown tries to import the default content type.
  - When you enable Smackdown, it'll automatically create the smackdown
    content type which contains a title and two nodereference CCK fields.
  - goto: admin/content/node-type/smackdown/fields
  - configure each nodereference field to reference the content type of your
    choice.

Credits
  "CCK Export for Node Modules"
  http://www.worxco.com/blog/cck-export-node-modules
  - EclipseGc

  Popups module - for an awesome implementation of jQuery
  http://drupal.org/project/popups
  - starbow
  
  Fivestar module - for examples on how to use VotingAPI
  http://drupal.org/project/fivestar
  - quicksketch
  
  Content module - for the import of content types and providing nodereferences
  http://drupal.org/project/cck
  - dww, yched, karens (taken from nodereference CVS $Id$s)
  
  Views2 module - for easy display integration
  http://drupal.org/project/views
  - merlinofchaos
  
  Voting API - to store smackdown results
  http://drupal.org/project/votingapi
  - eaton
  
  Special shout out to quicksketch for helping me implement the first iteration 
  of this module in D5. I learned a lot from that freaking genius!
  