module Assets exposing (..)


type AssetPath
    = AssetPath String


toUrl : AssetPath -> String
toUrl (AssetPath str) =
    str
