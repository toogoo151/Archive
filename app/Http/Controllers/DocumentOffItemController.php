<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DocumentOfficerItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class DocumentOffItemController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function documentOffItemiinShaardlaga(Request $req)
    {
        try {
            $getDocItems = DB::table("pko_document_items")
                ->where("pko_document_items.id", "=", $req->id)
                ->first();
            return $getDocItems->documentShaardlaga;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function newOffDocItem(Request $req)
    {
        try {

            // PDFtei holbootoi heseg
            if ($req->documentZagvar != "") {
                $userFolder = 'public/OffdocumentItem/' . $req->missionID . '/' . $req->eeljID;

                $image_64 = $req->documentZagvar;
                $setImagePathID = rand(9, 99999999) . "_" . $req->pdfName;

                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                $replace = substr($image_64, 0, strpos($image_64, ',') + 1);
                $pdf = str_replace($replace, '', $image_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder . "/" . $setImagePathID . "." . $extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/OffdocumentItem' . '/' . $req->missionID . '/' . $req->eeljID . '/' . $setImagePathID . "." . $extension;
            }
            //PDFtei holbootoi heseg end duusna

            $insertDocItem = new DocumentOfficerItem();
            $insertDocItem->missionID = $req->missionID;
            $insertDocItem->eeljID = $req->eeljID;
            $insertDocItem->documentName = $req->documentName;
            $insertDocItem->documentShaardlaga = $req->documentShaardlaga;
            if ($req->documentZagvar != "") {
                $insertDocItem->documentZagvar = $getPDFUrl;
            }
            $insertDocItem->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function editOffDocItem(Request $req)
    {
        try {

            // PDFtei holbootoi heseg
            if ($req->documentZagvar != "" && strlen($req->documentZagvar) > 50) {
                //pdf delete
                $deletePdf = DocumentOfficerItem::find($req->id);
                if ($deletePdf->documentZagvar != "0") {
                    Storage::delete('public' . $deletePdf->documentZagvar);
                }
                //pdf delete
                $userFolder = 'public/OffdocumentItem/' . $req->missionID . '/' . $req->eeljID;

                $pdf_64 = $req->documentZagvar;
                $setImagePathID = rand(9, 99999999) . "_" . $req->pdfName;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',') + 1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder . "/" . $setImagePathID . "." . $extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/OffdocumentItem' . '/' . $req->missionID . '/' . $req->eeljID . '/' . $setImagePathID . "." . $extension;
            }
            //PDFtei holbootoi heseg end duusna

            $edit = DocumentOfficerItem::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->documentName = $req->documentName;
            $edit->documentShaardlaga = $req->documentShaardlaga;
            if ($req->documentZagvar != "") {
                $edit->documentZagvar = $getPDFUrl;
            }
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function deleteOffDocItem(Request $req)
    {
        try {
            $delete = DocumentOfficerItem::find($req->id);
            if ($delete->documentZagvar != "0") {
                Storage::delete('public' . $delete->documentZagvar);
            }
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
