export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      brand: {
        Row: {
          brand_name: string
          created_at: string
          id: string
        }
        Insert: {
          brand_name: string
          created_at?: string
          id?: string
        }
        Update: {
          brand_name?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      home_new_product_update: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "home_new_product_update_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "m_product"
            referencedColumns: ["id"]
          },
        ]
      }
      m_product: {
        Row: {
          created_at: string
          id: string
          include_link_if_present: boolean
          product_link: string | null
          product_name: string
          rank_within_section: string | null
          reaction: string | null
          section_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          include_link_if_present: boolean
          product_link?: string | null
          product_name?: string
          rank_within_section?: string | null
          reaction?: string | null
          section_id: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          include_link_if_present?: boolean
          product_link?: string | null
          product_name?: string
          rank_within_section?: string | null
          reaction?: string | null
          section_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "m_product_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "m_section"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_product_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      m_product_tag: {
        Row: {
          created_at: string
          id: number
          m_product_id: string
          tag_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          m_product_id: string
          tag_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          m_product_id?: string
          tag_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "m_product_tag_m_product_id_fkey"
            columns: ["m_product_id"]
            isOneToOne: false
            referencedRelation: "m_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_product_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      m_product_user_save: {
        Row: {
          created_at: string
          id: string
          m_product_id: string
          src_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          m_product_id: string
          src_user_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          m_product_id?: string
          src_user_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "m_product_user_save_m_product_id_fkey"
            columns: ["m_product_id"]
            isOneToOne: false
            referencedRelation: "m_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_product_user_save_src_user_id_fkey"
            columns: ["src_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "m_product_user_save_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      m_section: {
        Row: {
          created_at: string
          id: string
          section_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_name?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          section_name?: string
          user_id?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: string
          tag_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tag_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tag_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          display_name: string
          id: string
          user_color_theme: string | null
          username: string
        }
        Insert: {
          display_name: string
          id: string
          user_color_theme?: string | null
          username: string
        }
        Update: {
          display_name?: string
          id?: string
          user_color_theme?: string | null
          username?: string
        }
        Relationships: []
      }
      user_user_follow: {
        Row: {
          created_at: string
          id: string
          src_user_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          src_user_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          src_user_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      top_followers: {
        Row: {
          follower_count: number | null
          src_user_id: string | null
        }
        Relationships: []
      }
      top_products: {
        Row: {
          m_product_id: string | null
          saved_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "m_product_user_save_m_product_id_fkey"
            columns: ["m_product_id"]
            isOneToOne: false
            referencedRelation: "m_product"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
