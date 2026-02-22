/* ------------------------------------------------------------------ */
/*  Auto-generated Supabase types — replace with `supabase gen types`  */
/* ------------------------------------------------------------------ */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          image: string | null;
          read_time: string;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          image?: string | null;
          read_time?: string;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          category?: string;
          image?: string | null;
          read_time?: string;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          theme: string;
          region: string;
          impact: string;
          description: string;
          objectives: string;
          activities: string;
          budget: string | null;
          image: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          theme: string;
          region: string;
          impact: string;
          description: string;
          objectives: string;
          activities: string;
          budget?: string | null;
          image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          theme?: string;
          region?: string;
          impact?: string;
          description?: string;
          objectives?: string;
          activities?: string;
          budget?: string | null;
          image?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contacts: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          profile: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          profile: string;
          message: string;
          read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          profile?: string;
          message?: string;
          read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      donations: {
        Row: {
          id: string;
          tx_ref: string;
          flw_ref: string | null;
          amount: number;
          currency: string;
          payment_method: string;
          status: string;
          donor_email: string;
          donor_name: string;
          project: string | null;
          recurring: boolean;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tx_ref: string;
          flw_ref?: string | null;
          amount: number;
          currency: string;
          payment_method: string;
          status?: string;
          donor_email: string;
          donor_name: string;
          project?: string | null;
          recurring?: boolean;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tx_ref?: string;
          flw_ref?: string | null;
          amount?: number;
          currency?: string;
          payment_method?: string;
          status?: string;
          donor_email?: string;
          donor_name?: string;
          project?: string | null;
          recurring?: boolean;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      post_translations: {
        Row: {
          id: string;
          post_id: string;
          locale: string;
          title: string;
          excerpt: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          locale: string;
          title: string;
          excerpt?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          locale?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_translations: {
        Row: {
          id: string;
          project_id: string;
          locale: string;
          title: string;
          description: string;
          objectives: string;
          activities: string;
          impact: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          locale: string;
          title: string;
          description?: string;
          objectives?: string;
          activities?: string;
          impact?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          locale?: string;
          title?: string;
          description?: string;
          objectives?: string;
          activities?: string;
          impact?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type Donation = Database["public"]["Tables"]["donations"]["Row"];
export type PostTranslation =
  Database["public"]["Tables"]["post_translations"]["Row"];
export type ProjectTranslation =
  Database["public"]["Tables"]["project_translations"]["Row"];

export type PostWithTranslations = Post & {
  translations: Record<string, PostTranslation>;
};

export type ProjectWithTranslations = Project & {
  translations: Record<string, ProjectTranslation>;
};
