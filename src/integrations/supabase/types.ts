export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      resonances: {
        Row: {
          created_at: string
          id: number
          type: string
          whisper_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
          whisper_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
          whisper_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resonances_whisper_id_fkey"
            columns: ["whisper_id"]
            isOneToOne: false
            referencedRelation: "whispers"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          content: string
          created_at: string
          id: number
          whisper_id: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          whisper_id?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          whisper_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_whisper_id_fkey"
            columns: ["whisper_id"]
            isOneToOne: false
            referencedRelation: "whispers"
            referencedColumns: ["id"]
          },
        ]
      }
      whispers: {
        Row: {
          audio_url: string | null
          content: string | null
          created_at: string
          emotion: string | null
          id: number
          is_secret: boolean | null
          is_whisper_of_day: boolean | null
          mode: string | null
          release_date: string | null
          resonance_count: number | null
          special_type: string | null
          theme: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          emotion?: string | null
          id?: number
          is_secret?: boolean | null
          is_whisper_of_day?: boolean | null
          mode?: string | null
          release_date?: string | null
          resonance_count?: number | null
          special_type?: string | null
          theme?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          emotion?: string | null
          id?: number
          is_secret?: boolean | null
          is_whisper_of_day?: boolean | null
          mode?: string | null
          release_date?: string | null
          resonance_count?: number | null
          special_type?: string | null
          theme?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_resonance_count: {
        Args: {
          whisper_id: number
        }
        Returns: undefined
      }
      update_old_whispers_to_past: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
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
