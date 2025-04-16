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
      advertisers: {
        Row: {
          active: boolean
          brand_hex_color: string | null
          created_at: string
          currency_id: string | null
          description: string | null
          domain: string
          id: string
          image_url: string | null
          metadata: Json | null
          name: string
          network_id: string | null
          slug: string
          up_to_pct: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          brand_hex_color?: string | null
          created_at?: string
          currency_id?: string | null
          description?: string | null
          domain: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name: string
          network_id?: string | null
          slug?: string
          up_to_pct?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          brand_hex_color?: string | null
          created_at?: string
          currency_id?: string | null
          description?: string | null
          domain?: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          name?: string
          network_id?: string | null
          slug?: string
          up_to_pct?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "advertisers_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advertisers_network_id_fkey"
            columns: ["network_id"]
            isOneToOne: false
            referencedRelation: "networks"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_related_blog_posts: {
        Row: {
          blog_post_id: string
          created_at: string
          id: string
          related_blog_post_id: string
        }
        Insert: {
          blog_post_id: string
          created_at?: string
          id?: string
          related_blog_post_id: string
        }
        Update: {
          blog_post_id?: string
          created_at?: string
          id?: string
          related_blog_post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_related_blog_posts_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_related_blog_posts_related_blog_post_id_fkey"
            columns: ["related_blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: Json
          created_at: string
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      currencies: {
        Row: {
          acronym: string
          created_at: string
          id: string
          name: string
          symbol: string
          updated_at: string
        }
        Insert: {
          acronym: string
          created_at?: string
          id?: string
          name: string
          symbol: string
          updated_at?: string
        }
        Update: {
          acronym?: string
          created_at?: string
          id?: string
          name?: string
          symbol?: string
          updated_at?: string
        }
        Relationships: []
      }
      networks: {
        Row: {
          active: boolean
          created_at: string
          domain: string | null
          id: string
          name: string
          transactions_last_updated_at: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          domain?: string | null
          id?: string
          name: string
          transactions_last_updated_at?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          domain?: string | null
          id?: string
          name?: string
          transactions_last_updated_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_balance_entries: {
        Row: {
          amount: number
          created_at: string
          currency_id: string
          id: string
          note: string | null
          transaction_id: string | null
          type: Database["public"]["Enums"]["balance_entry_type"]
          updated_balance: number
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          currency_id: string
          id?: string
          note?: string | null
          transaction_id?: string | null
          type: Database["public"]["Enums"]["balance_entry_type"]
          updated_balance?: number
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency_id?: string
          id?: string
          note?: string | null
          transaction_id?: string | null
          type?: Database["public"]["Enums"]["balance_entry_type"]
          updated_balance?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_balance_entries_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_balance_entries_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "user_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_balance_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_transactions: {
        Row: {
          advertiser_id: string
          created_at: string
          currency_id: string
          id: string
          metadata: Json | null
          network_id: string
          sale_amount: number
          total_commission: number
          tracking_id: string
          transaction_status: Database["public"]["Enums"]["transaction_status"]
          updated_at: string | null
          user_commission_reward_pct: number
          user_id: string | null
        }
        Insert: {
          advertiser_id: string
          created_at?: string
          currency_id: string
          id?: string
          metadata?: Json | null
          network_id: string
          sale_amount: number
          total_commission?: number
          tracking_id: string
          transaction_status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
          user_commission_reward_pct?: number
          user_id?: string | null
        }
        Update: {
          advertiser_id?: string
          created_at?: string
          currency_id?: string
          id?: string
          metadata?: Json | null
          network_id?: string
          sale_amount?: number
          total_commission?: number
          tracking_id?: string
          transaction_status?: Database["public"]["Enums"]["transaction_status"]
          updated_at?: string | null
          user_commission_reward_pct?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_transactions_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "advertisers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_transactions_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_transactions_network_id_fkey"
            columns: ["network_id"]
            isOneToOne: false
            referencedRelation: "networks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          tracking_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          tracking_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          tracking_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      balance_entry_type: "credit" | "redeem" | "adjustment"
      transaction_status:
        | "pending"
        | "approved"
        | "declined"
        | "expired"
        | "paid"
        | "credited"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      balance_entry_type: ["credit", "redeem", "adjustment"],
      transaction_status: [
        "pending",
        "approved",
        "declined",
        "expired",
        "paid",
        "credited",
      ],
    },
  },
} as const
