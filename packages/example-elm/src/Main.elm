module Main exposing (..)

import Css exposing (..)
import Assets exposing (AssetPath(..))
import Html
import Html.Styled exposing (..)
import Html.Styled.Events exposing (onClick)
import Html.Styled.Attributes exposing (src)


theme : { secondary : Color, primary : Color }
theme =
    { primary = hex "55af6a"
    , secondary = rgb 250 240 230
    }


{-| A reusable button which has some styles pre-applied to it.
-}
btn : List (Attribute msg) -> List (Html msg) -> Html msg
btn =
    styled button
        [ margin (px 12)
        , color (rgb 0 0 0)
        , backgroundColor theme.secondary
        , hover
            [ backgroundColor theme.primary
            , textDecoration underline
            ]
        ]


icon : AssetPath
icon =
    AssetPath "./assets/ship.jpg"


view : Model -> Html Msg
view model =
    nav []
        [ btn [ onClick DoSomething ] [ text "Click me!" ]
        , img [ src <| Assets.toUrl <| icon ] []
        ]


main : Program Never Model Msg
main =
    Html.beginnerProgram
        { view = view >> toUnstyled
        , update = update
        , model = initialModel
        }


type alias Model =
    ()


type Msg
    = DoSomething


initialModel : Model
initialModel =
    ()


update : a -> b -> ()
update msg model =
    ()
