import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Content Block Types
  type ContentBlock = {
    page : Text; // home, about, services, products, careers, contact
    section : Text; // hero_title, hero_subtitle, about_body, etc.
    value : Text;
  };

  // Contact Submission Types
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Job Listing Types
  type JobType = {
    #fullTime;
    #partTime;
    #contract;
  };

  module JobType {
    public func compare(jt1 : JobType, jt2 : JobType) : Order.Order {
      switch (jt1, jt2) {
        case (#fullTime, #fullTime) { #equal };
        case (#fullTime, _) { #less };
        case (#partTime, #fullTime) { #greater };
        case (#partTime, #partTime) { #equal };
        case (#partTime, #contract) { #less };
        case (#contract, #contract) { #equal };
        case (#contract, _) { #greater };
      };
    };
  };

  type JobListing = {
    title : Text;
    department : Text;
    location : Text;
    jobType : JobType;
    description : Text;
    requirements : [Text];
    isActive : Bool;
  };

  module JobListing {
    public func compare(j1 : JobListing, j2 : JobListing) : Order.Order {
      Text.compare(j1.title, j2.title);
    };
  };

  // Product Listing Types
  type ProductListing = {
    name : Text;
    tagline : Text;
    description : Text;
    features : [Text];
    isActive : Bool;
  };

  module ProductListing {
    public func compare(p1 : ProductListing, p2 : ProductListing) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  // Persistent Data Structures
  let contentBlocks = Map.empty<Text, ContentBlock>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let jobListings = Map.empty<Text, JobListing>();
  let productListings = Map.empty<Text, ProductListing>();

  // Initialize the user system state
  let accessControlState : AccessControl.AccessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Helper: any logged-in (non-anonymous) user is treated as admin
  func requireAuth(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: You must be signed in to perform this action");
    };
  };

  // Generate unique IDs for contact submissions
  var nextContactId = 0;

  // Content Block Functions
  public shared ({ caller }) func updateContentBlock(page : Text, section : Text, value : Text) : async () {
    requireAuth(caller);

    let contentBlock : ContentBlock = {
      page;
      section;
      value;
    };

    let key = page # "_" # section;
    contentBlocks.add(key, contentBlock);
  };

  public query ({ caller }) func getContentBlock(page : Text, section : Text) : async ?ContentBlock {
    let key = page # "_" # section;
    contentBlocks.get(key);
  };

  public query ({ caller }) func getAllContentBlocks() : async [ContentBlock] {
    contentBlocks.values().toArray();
  };

  // Contact Submission Functions
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : ?Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    let id = nextContactId.toText();
    contactSubmissions.add(id, submission);
    nextContactId += 1;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    requireAuth(caller);
    contactSubmissions.values().toArray();
  };

  // Job Listing Functions
  public shared ({ caller }) func createJobListing(title : Text, department : Text, location : Text, jobType : JobType, description : Text, requirements : [Text]) : async () {
    requireAuth(caller);

    let jobListing : JobListing = {
      title;
      department;
      location;
      jobType;
      description;
      requirements;
      isActive = true;
    };

    jobListings.add(title, jobListing);
  };

  public shared ({ caller }) func updateJobListing(title : Text, department : Text, location : Text, jobType : JobType, description : Text, requirements : [Text], isActive : Bool) : async () {
    requireAuth(caller);

    switch (jobListings.get(title)) {
      case (null) { Runtime.trap("Job listing not found") };
      case (?_) {
        let updatedListing : JobListing = {
          title;
          department;
          location;
          jobType;
          description;
          requirements;
          isActive;
        };
        jobListings.add(title, updatedListing);
      };
    };
  };

  public query ({ caller }) func getActiveJobListings() : async [JobListing] {
    jobListings.values().toArray().filter(func(job) { job.isActive });
  };

  public query ({ caller }) func getAllJobListings() : async [JobListing] {
    requireAuth(caller);
    jobListings.values().toArray();
  };

  // Product Listing Functions
  public shared ({ caller }) func createProductListing(name : Text, tagline : Text, description : Text, features : [Text]) : async () {
    requireAuth(caller);

    let productListing : ProductListing = {
      name;
      tagline;
      description;
      features;
      isActive = true;
    };

    productListings.add(name, productListing);
  };

  public shared ({ caller }) func updateProductListing(name : Text, tagline : Text, description : Text, features : [Text], isActive : Bool) : async () {
    requireAuth(caller);

    switch (productListings.get(name)) {
      case (null) { Runtime.trap("Product listing not found") };
      case (?_) {
        let updatedListing : ProductListing = {
          name;
          tagline;
          description;
          features;
          isActive;
        };
        productListings.add(name, updatedListing);
      };
    };
  };

  public query ({ caller }) func getActiveProductListings() : async [ProductListing] {
    productListings.values().toArray().filter(func(product) { product.isActive });
  };

  public query ({ caller }) func getAllProductListings() : async [ProductListing] {
    requireAuth(caller);
    productListings.values().toArray();
  };

  // Seed Default Content Blocks (run once)
  public shared ({ caller }) func seedDefaultContent() : async () {
    requireAuth(caller);

    // Home Page
    let homeHeroTitle : ContentBlock = {
      page = "home";
      section = "hero_title";
      value = "Welcome to El-shaddai Technologies Inc";
    };
    contentBlocks.add("home_hero_title", homeHeroTitle);

    let homeHeroSubtitle : ContentBlock = {
      page = "home";
      section = "hero_subtitle";
      value = "Innovative IT Staffing Solutions";
    };
    contentBlocks.add("home_hero_subtitle", homeHeroSubtitle);

    // About Page
    let aboutBody : ContentBlock = {
      page = "about";
      section = "about_body";
      value = "We are a professional IT staffing company with over 20 years of experience.";
    };
    contentBlocks.add("about_about_body", aboutBody);

    // Services Page
    let servicesIntro : ContentBlock = {
      page = "services";
      section = "services_intro";
      value = "Our range of services includes IT consulting, project management, and more.";
    };
    contentBlocks.add("services_services_intro", servicesIntro);

    // Products Page
    let productsIntro : ContentBlock = {
      page = "products";
      section = "products_intro";
      value = "Explore our innovative software products designed to boost your business.";
    };
    contentBlocks.add("products_products_intro", productsIntro);

    // Careers Page
    let careersIntro : ContentBlock = {
      page = "careers";
      section = "careers_intro";
      value = "Join our team and take your career to the next level.";
    };
    contentBlocks.add("careers_careers_intro", careersIntro);

    // Contact Page
    let contactIntro : ContentBlock = {
      page = "contact";
      section = "contact_intro";
      value = "Get in touch with us for all your IT staffing needs.";
    };
    contentBlocks.add("contact_contact_intro", contactIntro);
  };
};
