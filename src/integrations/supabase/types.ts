export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          college: string | null
          course: string | null
          created_at: string
          domain: string
          email: string
          full_name: string
          id: string
          intern_id: string
          offer_issued_at: string
          phone: string | null
          photo_url: string | null
          status: Database["public"]["Enums"]["application_status"]
          user_id: string
          year: string | null
        }
        Insert: {
          college?: string | null
          course?: string | null
          created_at?: string
          domain: string
          email: string
          full_name: string
          id?: string
          intern_id: string
          offer_issued_at?: string
          phone?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          user_id: string
          year?: string | null
        }
        Update: {
          college?: string | null
          course?: string | null
          created_at?: string
          domain?: string
          email?: string
          full_name?: string
          id?: string
          intern_id?: string
          offer_issued_at?: string
          phone?: string | null
          photo_url?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          user_id?: string
          year?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          application_id: string
          certificate_id: string
          id: string
          issued_at: string
          verification_hash: string
        }
        Insert: {
          application_id: string
          certificate_id: string
          id?: string
          issued_at?: string
          verification_hash: string
        }
        Update: {
          application_id?: string
          certificate_id?: string
          id?: string
          issued_at?: string
          verification_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          application_id: string
          id: string
          screenshot_url: string | null
          status: Database["public"]["Enums"]["payment_status"]
          submitted_at: string
          utr_number: string
          verified_at: string | null
        }
        Insert: {
          amount?: number
          application_id: string
          id?: string
          screenshot_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          submitted_at?: string
          utr_number: string
          verified_at?: string | null
        }
        Update: {
          amount?: number
          application_id?: string
          id?: string
          screenshot_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          submitted_at?: string
          utr_number?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          college: string | null
          course: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          photo_url: string | null
          updated_at: string
          year: string | null
        }
        Insert: {
          college?: string | null
          course?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          photo_url?: string | null
          updated_at?: string
          year?: string | null
        }
        Update: {
          college?: string | null
          course?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          photo_url?: string | null
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          application_id: string
          deployed_url: string | null
          feedback: string | null
          github_url: string | null
          id: string
          notes: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string
          task_id: string
        }
        Insert: {
          application_id: string
          deployed_url?: string | null
          feedback?: string | null
          github_url?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          task_id: string
        }
        Update: {
          application_id?: string
          deployed_url?: string | null
          feedback?: string | null
          github_url?: string | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          description: string
          domain: string
          id: string
          resources: string | null
          task_number: number
          title: string
        }
        Insert: {
          description: string
          domain: string
          id?: string
          resources?: string | null
          task_number: number
          title: string
        }
        Update: {
          description?: string
          domain?: string
          id?: string
          resources?: string | null
          task_number?: number
          title?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status: "pending" | "approved"
      payment_status: "pending" | "verified" | "rejected"
      submission_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      application_status: ["pending", "approved"],
      payment_status: ["pending", "verified", "rejected"],
      submission_status: ["pending", "approved", "rejected"],
    },
  },
} as const
